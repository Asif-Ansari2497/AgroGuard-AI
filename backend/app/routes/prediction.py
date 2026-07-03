"""
AgroGuard AI — Prediction Route
"""
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends, Form
from typing import Optional

from app.routes.auth import get_current_user
from app.utils.image_processor import validate_image, save_image, validate_leaf_image
from app.services.prediction_service import predict_disease_from_bytes, save_prediction
from app.utils.config import get_disease_info

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/")
async def predict(
    file: UploadFile = File(...),
    latitude: Optional[float] = Form(None),
    longitude: Optional[float] = Form(None),
    location_name: Optional[str] = Form(None),
    lang: Optional[str] = Form("en"),
    current_user: dict = Depends(get_current_user),
):
    # Read file bytes
    file_bytes = await file.read()
    
    # ============ LEAF VALIDATION - CRITICAL ============
    is_leaf, green_ratio, error_msg = validate_leaf_image(file_bytes)
    print(f"🌿 Leaf validation: is_leaf={is_leaf}, green_ratio={green_ratio:.4f}")
    
    if not is_leaf:
        return {
            "status": "error",
            "message": "⚠️ This doesn't look like a plant leaf image.",
            "suggestion": "Please upload a clear photo of a diseased plant leaf.",
            "disease_name": "Not a Leaf",
            "confidence": 0,
            "severity": "unknown",
            "description": f"The uploaded image doesn't appear to be a plant leaf. Green ratio: {green_ratio:.2%}. Please upload a clear photo of a leaf.",
            "treatment": "No treatment available for non-leaf images.",
            "prevention": "Take a clear photo of a diseased leaf and try again."
        }
    # ====================================================

    # Validate image (size, format, etc.)
    try:
        validate_image(file_bytes, file.filename or "upload.jpg")
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Save original image to disk
    image_path = save_image(file_bytes, file.filename or "upload.jpg")

    # Predict disease
    disease_name, confidence, probs = predict_disease_from_bytes(file_bytes)

    # Get disease details from config
    disease_info = get_disease_info(disease_name, lang)

    # Save to database
    saved = await save_prediction(
        user_id=str(current_user["_id"]),
        disease_name=disease_name,
        confidence=confidence,
        image_path=image_path,
        latitude=latitude,
        longitude=longitude,
        location_name=location_name,
    )
    
    print(f"✅ Prediction saved for user {current_user['_id']}: {disease_name} (confidence {confidence:.2f})")

    return {
        "status": "success",
        "id": str(saved["_id"]),
        "disease_name": disease_name,
        "confidence": confidence,
        "description": disease_info["description"],
        "treatment": disease_info["treatment"],
        "prevention": disease_info["prevention"],
        "severity": disease_info["severity"],
        "image_path": image_path,
        "green_ratio": green_ratio,
        "created_at": saved["created_at"].isoformat() if hasattr(saved["created_at"], "isoformat") else saved["created_at"],
    }