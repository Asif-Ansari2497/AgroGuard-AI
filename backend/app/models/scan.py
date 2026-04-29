"""
AgroGuard AI - Scan / Prediction Models
Pydantic schemas for prediction requests and responses.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class PredictionResult(BaseModel):
    disease_name: str
    confidence: float
    description: str
    treatment: str
    prevention: str
    severity: str  # none | low | medium | high | critical
    image_path: str
    created_at: datetime


class ScanResponse(BaseModel):
    id: str
    user_id: str
    disease_name: str
    confidence: float
    description: str
    treatment: str
    prevention: str
    severity: str
    image_path: str
    # Geolocation for outbreak map
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    location_name: Optional[str] = None
    created_at: datetime


class ScanListResponse(BaseModel):
    scans: List[ScanResponse]
    total: int


class OutbreakPoint(BaseModel):
    """Represents a single disease outbreak point for the heatmap."""
    latitude: float
    longitude: float
    disease_name: str
    confidence: float
    intensity: float  # 0-1, for heatmap weight
    location_name: Optional[str] = None
    created_at: datetime


class OutbreakHeatmapResponse(BaseModel):
    points: List[OutbreakPoint]
    total: int
    diseases: List[str]  # unique disease names in dataset
