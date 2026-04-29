"""
AgroGuard AI - Scans / History Routes
GET /scans/history   – user's prediction history
GET /scans/stats     – dashboard analytics
GET /scans/outbreak  – disease outbreak heatmap data
"""

from fastapi import APIRouter, Depends, Query
from bson import ObjectId

from app.routes.auth import get_current_user
from app.services.prediction_service import (
    get_user_predictions,
    get_dashboard_stats,
    get_all_outbreak_points,
)

router = APIRouter(prefix="/scans", tags=["Scans"])


def _serialize(doc: dict) -> dict:
    """Convert MongoDB doc to JSON-safe dict."""
    doc["id"] = str(doc.pop("_id"))
    if "created_at" in doc:
        doc["created_at"] = doc["created_at"].isoformat()
    return doc


@router.get("/history")
async def history(
    limit: int = Query(50, ge=1, le=200),
    current_user: dict = Depends(get_current_user),
):
    """Return authenticated user's prediction history."""
    user_id = str(current_user["_id"])
    scans = await get_user_predictions(user_id, limit=limit)
    return {"scans": [_serialize(s) for s in scans], "total": len(scans)}


@router.get("/stats")
async def stats(current_user: dict = Depends(get_current_user)):
    """Return dashboard analytics for the authenticated user."""
    user_id = str(current_user["_id"])
    return await get_dashboard_stats(user_id)


@router.get("/outbreak")
async def get_outbreak_points(
    days: int = 30,
    disease: str = None,
    current_user: dict = Depends(get_current_user)
):
    """Get outbreak points for heatmap"""
    from app.services.prediction_service import get_all_outbreak_points
    points = await get_all_outbreak_points(days)
    
    # Filter by disease if specified
    if disease and disease != 'all':
        points = [p for p in points if p.get('disease') == disease]
    
    return points