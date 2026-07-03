    # ── AgroGuard AI — Backend Dockerfile ────────────────────────────────────────
    FROM python:3.11-slim

    # Set working directory
    WORKDIR /app

    # Install system dependencies (for Pillow, bcrypt)
    RUN apt-get update && apt-get install -y --no-install-recommends \
        libglib2.0-0 libsm6 libxrender1 libxext6 libgl1 \
        && rm -rf /var/lib/apt/lists/*

    # Copy and install Python deps
    COPY backend/requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt

    # Copy application code
    COPY backend/ .
    COPY frontend ./frontend

    # Create uploads directory
    RUN mkdir -p uploads

    # Expose FastAPI port
    EXPOSE 8000

    # Start server
    CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
