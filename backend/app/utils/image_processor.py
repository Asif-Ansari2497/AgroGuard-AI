import io
import os
import uuid
from PIL import Image
import numpy as np

# Configuration
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
UPLOAD_DIR = "uploads"  # relative to backend folder

def validate_image(file_bytes: bytes, filename: str) -> tuple:
    """
    Validate image file size, extension, and integrity.
    Returns (is_valid, error_message)
    """
    # Check file size
    if len(file_bytes) > MAX_FILE_SIZE:
        return False, f"File too large. Max size {MAX_FILE_SIZE // (1024*1024)} MB"
    
    # Check extension
    ext = filename.split('.')[-1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return False, f"Invalid file type. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
    
    # Try to open image to verify it's not corrupted
    try:
        img = Image.open(io.BytesIO(file_bytes))
        img.verify()
        return True, None
    except Exception:
        return False, "Corrupted or invalid image file"

def save_image(file_bytes: bytes, filename: str = None) -> str:
    """
    Save image to disk and return the saved file path.
    If filename not provided, generate a unique name.
    """
    # Create uploads directory if not exists
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    if filename is None:
        ext = "jpg"  # default
        filename = f"{uuid.uuid4().hex}.{ext}"
    else:
        # Ensure unique name to avoid collisions
        name, ext = os.path.splitext(filename)
        filename = f"{uuid.uuid4().hex}{ext}"
    
    file_path = os.path.join(UPLOAD_DIR, filename)
    with open(file_path, "wb") as f:
        f.write(file_bytes)
    return file_path

def preprocess_image(image_bytes):
    """
    Preprocess image for MobileNetV2 model (224x224, normalized to [0,1])
    """
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array