#!/bin/bash
# ── AgroGuard AI — Deploy Script ──────────────────────────────────────────────
# Run this script to deploy the full application using Docker Compose
# Usage: bash deploy.sh

set -e  # Exit immediately if any command fails

echo ""
echo "🌿 =================================="
echo "   AgroGuard AI — Deploy Script"
echo "🌿 =================================="
echo ""

# ── Check Docker is installed ──────────────────────────────────────────────────
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Download: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed."
    exit 1
fi

echo "✅ Docker found: $(docker --version)"
echo ""

# ── Check .env file exists ─────────────────────────────────────────────────────
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ .env created. Please edit SECRET_KEY before production use."
    else
        echo "❌ .env.example not found. Cannot continue."
        exit 1
    fi
fi

# ── Check ML model ─────────────────────────────────────────────────────────────
if [ ! -f "server/models/tomato_disease_model.h5" ]; then
    echo "⚠️  No ML model found at server/models/tomato_disease_model.h5"
    echo "   App will use MOCK predictions. This is fine for testing."
    echo ""
fi

# ── Stop old containers ────────────────────────────────────────────────────────
echo "🛑 Stopping any existing containers..."
docker-compose down 2>/dev/null || true

# ── Build and start ────────────────────────────────────────────────────────────
echo ""
echo "🔨 Building and starting all services..."
echo "   (First build may take 3-5 minutes)"
echo ""
docker-compose up --build -d

# ── Wait for backend ───────────────────────────────────────────────────────────
echo ""
echo "⏳ Waiting for backend to start..."
sleep 8

# ── Health check ───────────────────────────────────────────────────────────────
HEALTH=$(curl -s http://localhost:8000/health 2>/dev/null || echo "not ready")
if echo "$HEALTH" | grep -q "ok"; then
    echo "✅ Backend is healthy!"
else
    echo "⚠️  Backend may still be starting. Check logs: docker-compose logs backend"
fi

# ── Done ───────────────────────────────────────────────────────────────────────
echo ""
echo "🌿 =================================="
echo "   AgroGuard AI is RUNNING!"
echo "🌿 =================================="
echo ""
echo "   🌐 App:      http://localhost"
echo "   📡 API:      http://localhost:8000"
echo "   📚 API Docs: http://localhost:8000/api/docs"
echo ""
echo "   To stop:  docker-compose down"
echo "   Logs:     docker-compose logs -f"
echo ""
