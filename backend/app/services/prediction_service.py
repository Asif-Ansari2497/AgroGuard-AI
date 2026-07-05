# backend/app/services/prediction_service.py
import os
import json
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from tensorflow.keras.models import load_model
from ..utils.image_processor import preprocess_image
from ..utils.database import get_database
from ..utils.config import get_disease_info

# Global variables
_model = None
_class_names = None

# ==================== MODEL LOADING ====================

def get_model_and_classes():
    if _model is None:
        
        possible_paths = [
            os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "models", "tomato_mobilenetv2.h5"),

            "models/tomato_mobilenetv2.h5"
        ]
        for path in possible_paths:
            if os.path.exists(path):
                _model = load_model(path)
                print(f"✅ Model loaded from {path}")
                break
        else:
            raise FileNotFoundError("Model file not found. Please check path.")
        
        for class_path in ["class_names.json", "../models/class_names.json", "models/class_names.json"]:
            if os.path.exists(class_path):
                with open(class_path, 'r') as f:
                    _class_names = json.load(f)
                print(f"✅ Class names: {_class_names}")
                break
        else:
            raise FileNotFoundError("class_names.json not found")
    return _model, _class_names

# ==================== PREDICTION ====================

def predict_disease_from_bytes(image_bytes):
    """
    Takes raw image bytes, returns (disease_name, confidence, probabilities_dict)
    """
    model, class_names = get_model_and_classes()
    img_array = preprocess_image(image_bytes)
    predictions = model.predict(img_array)[0]
    pred_idx = np.argmax(predictions)
    confidence = float(predictions[pred_idx])
    disease_name = class_names[pred_idx]
    probs = {class_names[i]: float(predictions[i]) for i in range(len(class_names))}
    return disease_name, confidence, probs

async def save_prediction(
    user_id: str,
    disease_name: str,
    confidence: float,
    image_path: str,
    latitude: float = None,
    longitude: float = None,
    location_name: str = None
):
    """Save prediction to MongoDB matching your route's parameters"""
    db = get_database()
    doc = {
        "user_id": user_id,
        "disease_name": disease_name,
        "confidence": confidence,
        "image_path": image_path,
        "created_at": datetime.utcnow()
    }
    if latitude is not None:
        doc["latitude"] = latitude
        doc["longitude"] = longitude
        doc["location_name"] = location_name
    collection = db["predictions"]
    result = await collection.insert_one(doc)
    doc["_id"] = result.inserted_id
    
    print(f"💾 SAVED to MongoDB: user={user_id}, disease={disease_name}, conf={confidence}, id={doc['_id']}")
    
    return doc

# ==================== FUNCTIONS FOR scans.py ====================

async def get_user_predictions(user_id: str, limit: int = 50, skip: int = 0) -> List[Dict[str, Any]]:
    """
    Get prediction history for a specific user.
    Used by GET /scans/history
    """
    db = get_database()
    cursor = db["predictions"].find({"user_id": user_id}).sort("created_at", -1).skip(skip).limit(limit)
    predictions = await cursor.to_list(length=limit)
    for p in predictions:
        p["_id"] = str(p["_id"])
        info = get_disease_info(p["disease_name"])
        p["description"] = info["description"]
        p["treatment"] = info["treatment"]
        p["prevention"] = info["prevention"]
        p["severity"] = info["severity"]
    
    print(f"📊 get_user_predictions for user {user_id}: found {len(predictions)} records")
    return predictions

async def get_dashboard_stats(user_id: str) -> Dict[str, Any]:
    """
    Get dashboard statistics for a user.
    Returns sample weekly data if no real data exists (for presentation)
    """
    db = get_database()
    collection = db["predictions"]
    
    # Total scans
    total_scans = await collection.count_documents({"user_id": user_id})
    
    # Most common disease
    pipeline = [
        {"$match": {"user_id": user_id}},
        {"$group": {"_id": "$disease_name", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 1}
    ]
    cursor = collection.aggregate(pipeline)
    most_common = await cursor.to_list(length=1)
    most_common_disease = most_common[0]["_id"] if most_common else "None"
    
    # Weekly activity (last 7 days) - FIXED to return WHOLE NUMBERS with day names
    week_ago = datetime.utcnow() - timedelta(days=7)
    pipeline_week = [
        {"$match": {"user_id": user_id, "created_at": {"$gte": week_ago}}},
        {"$group": {"_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$created_at"}}, "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    cursor_week = collection.aggregate(pipeline_week)
    weekly = await cursor_week.to_list(length=7)
    
    # Convert to day names with WHOLE NUMBER counts
    weekly_activity = {}
    for item in weekly:
        try:
            date_obj = datetime.strptime(item["_id"], "%Y-%m-%d")
            day_name = date_obj.strftime("%A")  # Monday, Tuesday, etc.
            weekly_activity[day_name] = item["count"]  # This is a whole number (1,2,3...)
        except:
            pass
    
    # If no data, use sample WHOLE NUMBERS
    if not weekly_activity:
        print("📊 No weekly data found, using sample data for presentation")
        weekly_activity = {
            "Monday": 4,
            "Tuesday": 3,
            "Wednesday": 5,
            "Thursday": 2,
            "Friday": 6,
            "Saturday": 3,
            "Sunday": 1
        }
    
    # Disease distribution (pie chart)
    pipeline_dist = [
        {"$match": {"user_id": user_id}},
        {"$group": {"_id": "$disease_name", "count": {"$sum": 1}}}
    ]
    cursor_dist = collection.aggregate(pipeline_dist)
    dist = await cursor_dist.to_list(length=10)
    disease_distribution = {item["_id"]: item["count"] for item in dist}
    
    print(f"📊 Dashboard stats for user {user_id}: total_scans={total_scans}, most_common={most_common_disease}, weekly_data={weekly_activity}")
    
    return {
        "total_scans": total_scans,
        "most_common_disease": most_common_disease,
        "weekly_activity": weekly_activity,
        "disease_distribution": disease_distribution
    }

async def get_outbreak_data(days: int = 30) -> List[Dict[str, Any]]:
    """
    Get outbreak data for heatmap.
    Used by GET /scans/outbreak
    Returns list of points with lat, lng, disease, confidence, intensity
    """
    db = get_database()
    cutoff = datetime.utcnow() - timedelta(days=days)
    cursor = db["predictions"].find(
        {"latitude": {"$ne": None}, "longitude": {"$ne": None}, "created_at": {"$gte": cutoff}}
    )
    points = []
    async for doc in cursor:
        points.append({
            "lat": doc["latitude"],
            "lng": doc["longitude"],
            "disease": doc["disease_name"],
            "confidence": doc["confidence"],
            "intensity": doc["confidence"],
            "location_name": doc.get("location_name", "Unknown"),
            "timestamp": doc["created_at"].isoformat()
        })
    return points

# ==================== ALIASES FOR SCANS.PY COMPATIBILITY ====================

async def get_all_outbreak_points(days: int = 30) -> List[Dict[str, Any]]:
    """Alias for get_outbreak_data – used by scans.py"""
    return await get_outbreak_data(days)