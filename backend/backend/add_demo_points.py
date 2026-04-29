# backend/add_demo_points.py
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
from datetime import datetime

async def add_demo():
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    db = client.agroguard
    
    # Get a user
    user = await db.users.find_one()
    if not user:
        print("No user found. Login first!")
        return
    
    user_id = str(user["_id"])
    print(f"Adding demo points for user: {user['email']}")
    
    demo_points = [
        {"lat": 28.61, "lng": 77.20, "disease_name": "Tomato_Late_blight", "confidence": 0.85, "location_name": "Delhi", "user_id": user_id, "created_at": datetime.utcnow()},
        {"lat": 19.08, "lng": 72.88, "disease_name": "Tomato_Early_blight", "confidence": 0.74, "location_name": "Mumbai", "user_id": user_id, "created_at": datetime.utcnow()},
        {"lat": 13.08, "lng": 80.27, "disease_name": "Tomato_Late_blight", "confidence": 0.73, "location_name": "Chennai", "user_id": user_id, "created_at": datetime.utcnow()},
        {"lat": 12.97, "lng": 77.59, "disease_name": "Tomato_healthy", "confidence": 0.94, "location_name": "Bangalore", "user_id": user_id, "created_at": datetime.utcnow()},
        {"lat": 17.39, "lng": 78.49, "disease_name": "Tomato_Late_blight", "confidence": 0.84, "location_name": "Hyderabad", "user_id": user_id, "created_at": datetime.utcnow()},
        {"lat": 22.57, "lng": 88.36, "disease_name": "Tomato_Late_blight", "confidence": 0.89, "location_name": "Kolkata", "user_id": user_id, "created_at": datetime.utcnow()},
        {"lat": 26.91, "lng": 75.79, "disease_name": "Tomato_Early_blight", "confidence": 0.91, "location_name": "Jaipur", "user_id": user_id, "created_at": datetime.utcnow()},
        {"lat": 23.02, "lng": 72.57, "disease_name": "Tomato_Late_blight", "confidence": 0.68, "location_name": "Ahmedabad", "user_id": user_id, "created_at": datetime.utcnow()},
        {"lat": 18.52, "lng": 73.86, "disease_name": "Tomato_Early_blight", "confidence": 0.83, "location_name": "Pune", "user_id": user_id, "created_at": datetime.utcnow()},
        {"lat": 11.02, "lng": 76.96, "disease_name": "Tomato_Late_blight", "confidence": 0.81, "location_name": "Coimbatore", "user_id": user_id, "created_at": datetime.utcnow()},
    ]
    
    for point in demo_points:
        await db.predictions.insert_one(point)
    
    print(f"✅ Added {len(demo_points)} demo points across India!")
    client.close()

if __name__ == "__main__":
    asyncio.run(add_demo())