"""
AgroGuard AI — Prediction Route
"""
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends, Form
from typing import Optional

from app.routes.auth import get_current_user
from app.utils.image_processor import validate_image, save_image
from app.services.prediction_service import predict_disease_from_bytes, save_prediction
from app.utils.config import get_disease_info

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/")
async def predict(
    file: UploadFile = File(...),
    latitude: Optional[float] = Form(None),
    longitude: Optional[float] = Form(None),
    location_name: Optional[str] = Form(None),
    lang: Optional[str] = Form("en"),  # ← ADD THIS LINE
    current_user: dict = Depends(get_current_user),
):
    # Read file bytes
    file_bytes = await file.read()

    # Validate image
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
        "id":           str(saved["_id"]),
        "disease_name": disease_name,
        "confidence":   confidence,
        "description":  disease_info["description"],
        "treatment":    disease_info["treatment"],
        "prevention":   disease_info["prevention"],
        "severity":     disease_info["severity"],
        "image_path":   image_path,
        "created_at":   saved["created_at"].isoformat() if hasattr(saved["created_at"], "isoformat") else saved["created_at"],
    }