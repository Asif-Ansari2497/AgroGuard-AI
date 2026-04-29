from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from app.utils.database import users_collection

# HARDCODED - SAME FOR CREATE AND DECODE
SECRET_KEY = "my_fixed_secret_key_12345"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

async def register_user(name: str, email: str, password: str, location: str = None):
    existing = await users_collection().find_one({"email": email})
    if existing:
        raise ValueError("Email already registered")
    user = {
        "name": name,
        "email": email,
        "password": hash_password(password),
        "location": location,
        "created_at": datetime.utcnow()
    }
    result = await users_collection().insert_one(user)
    user["_id"] = result.inserted_id
    return user

async def authenticate_user(email: str, password: str):
    user = await users_collection().find_one({"email": email})
    if not user or not verify_password(password, user["password"]):
        return None
    return user

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    print("✅ TOKEN CREATED")
    return token

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("✅ TOKEN DECODED")
        return payload
    except Exception as e:
        print(f"❌ DECODE ERROR: {e}")
        return None

async def get_user_by_id(user_id: str):
    from bson import ObjectId
    try:
        return await users_collection().find_one({"_id": ObjectId(user_id)})
    except:
        return None

def format_user(user: dict) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "location": user.get("location"),
        "created_at": user["created_at"].isoformat()
    }