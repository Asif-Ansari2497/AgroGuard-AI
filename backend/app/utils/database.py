"""
AgroGuard AI - Database Connection Manager
Handles MongoDB connection and collection access via Motor (async).
"""

from motor.motor_asyncio import AsyncIOMotorClient
from app.utils.config import MONGO_URI, DATABASE_NAME
import logging

logger = logging.getLogger(__name__)

# Global client instance
_client: AsyncIOMotorClient = None


async def connect_db():
    """Initialize MongoDB connection."""
    global _client
    try:
        _client = AsyncIOMotorClient(MONGO_URI)
        # Ping to verify connection
        await _client.admin.command("ping")
        logger.info(f"✅ Connected to MongoDB at {MONGO_URI}")
    except Exception as e:
        logger.error(f"❌ MongoDB connection failed: {e}")
        raise


async def disconnect_db():
    """Close MongoDB connection."""
    global _client
    if _client:
        _client.close()
        logger.info("MongoDB connection closed.")


def get_database():
    """Return the database instance."""
    if _client is None:
        raise RuntimeError("Database not initialized. Call connect_db() first.")
    return _client[DATABASE_NAME]


def get_collection(name: str):
    """Return a specific collection from the database."""
    return get_database()[name]


# ─── Collection Accessors ─────────────────────────────────────────────────────

def users_collection():
    return get_collection("users")


def predictions_collection():
    return get_collection("predictions")


def outbreak_collection():
    return get_collection("outbreaks")
