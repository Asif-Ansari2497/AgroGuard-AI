from typing import Optional
from pydantic import BaseModel
from fastapi import APIRouter, HTTPException, Depends, Form
from fastapi.security import OAuth2PasswordBearer

from app.models.user import UserRegister, UserResponse, TokenResponse
from app.services.auth_service import (
    register_user, authenticate_user, create_access_token,
    decode_token, get_user_by_id, format_user
)

router = APIRouter(prefix="/auth", tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    print(f"🔍 Received token: {token[:20]}...")
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token.")
    user = await get_user_by_id(payload.get("sub"))
    if not user:
        raise HTTPException(status_code=401, detail="User not found.")
    return user

@router.post("/register", response_model=TokenResponse, status_code=201)
async def register(body: UserRegister):
    try:
        user = await register_user(body.name, body.email, body.password, body.location)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    token = create_access_token({"sub": str(user["_id"])})
    print(f"✅ Registered: {user['email']}, token stored")
    return {"access_token": token, "token_type": "bearer", "user": format_user(user)}

@router.post("/token", response_model=TokenResponse)
async def login(username: str = Form(...), password: str = Form(...)):
    user = await authenticate_user(username, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    token = create_access_token({"sub": str(user["_id"])})
    print(f"✅ Login: {user['email']}")
    return {"access_token": token, "token_type": "bearer", "user": format_user(user)}

@router.get("/me", response_model=UserResponse)
async def me(current_user: dict = Depends(get_current_user)):
    return format_user(current_user)

class UpdateProfileRequest(BaseModel):
    name: str
    location: Optional[str] = None

@router.put("/profile")
async def update_profile(req: UpdateProfileRequest, current_user: dict = Depends(get_current_user)):
    if not req.name or len(req.name.strip()) < 2:
        raise HTTPException(status_code=400, detail="Name must be at least 2 characters.")
    from app.utils.database import users_collection
    await users_collection().update_one(
        {"_id": current_user["_id"]},
        {"$set": {"name": req.name.strip(), "location": req.location}}
    )
    updated = await users_collection().find_one({"_id": current_user["_id"]})
    return {
        "id": str(updated["_id"]),
        "name": updated["name"],
        "email": updated["email"],
        "location": updated.get("location"),
        "created_at": updated["created_at"].isoformat(),
        "message": "Profile updated successfully."
    }