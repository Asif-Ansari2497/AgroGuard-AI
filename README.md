# 🌿 AgroGuard AI

**AI-powered crop disease detection for farmers.** Upload a leaf image, get instant disease diagnosis, treatment advice, and contribute to a real-time outbreak heatmap.

---

## ✨ Features

| Feature | Status |
|---|---|
| 🔐 JWT Authentication (Register / Login) | ✅ |
| 🍃 AI Leaf Disease Detection (TensorFlow) | ✅ |
| 📊 Dashboard Analytics (Chart.js) | ✅ |
| 🗺️ Real-Time Disease Outbreak Heatmap (Leaflet.heat) | ✅ |
| 🌐 Multilingual (English / Hindi / Punjabi) | ✅ |
| 📱 Responsive Mobile UI | ✅ |
| 🐳 Docker + Nginx Production Deploy | ✅ |

---

## 🗂️ Project Structure

```
agroguard-ai/
├── server/
│   ├── app/
│   │   ├── models/          # Pydantic schemas (user, scan)
│   │   ├── routes/          # FastAPI routers (auth, predict, scans)
│   │   ├── services/        # Business logic (auth_service, prediction_service)
│   │   └── utils/           # Config, database, image_processor
│   ├── main.py              # FastAPI app entry point
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── css/style.css        # Design system (organic-earth aesthetic)
│   ├── js/
│   │   ├── app.js           # Core utils: API client, i18n, auth state
│   │   ├── auth.js          # Login/Register modal UI logic
│   │   ├── dashboard.js     # Charts, history table, progress tracker
│   │   └── map.js           # Leaflet heatmap + markers, auto-refresh
│   ├── translations/
│   │   ├── en.json          # English
│   │   ├── hi.json          # Hindi
│   │   └── pa.json          # Punjabi
│   ├── index.html           # Home: upload + detection
│   ├── dashboard.html       # Analytics dashboard
│   └── map.html             # Outbreak heatmap
├── docker-compose.yml
├── nginx.conf
└── .env.example
```

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# 1. Clone & setup
cp .env.example .env
# Edit .env with your SECRET_KEY

# 2. Place your trained model
cp your_model.h5 server/models/tomato_disease_model.h5

# 3. Launch
docker-compose up --build

# App runs at: http://localhost
# API docs at: http://localhost/api/docs
```

### Option 2: Local Development

**Backend:**
```bash
cd server
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env    # edit as needed
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
# Serve with any static file server:
cd frontend
python -m http.server 3000
# Open http://localhost:3000
```

**MongoDB:**
```bash
# Option A: Docker
docker run -d -p 27017:27017 --name mongo mongo:7

# Option B: Local install
mongod --dbpath ./data
```

---

## 🤖 ML Model

The app uses a TensorFlow/Keras CNN trained on the **PlantVillage** dataset (tomato classes).

**If you don't have a model**, the app automatically falls back to **mock predictions** for development and demo purposes.

### Train your own model:

See `server/notebook/train_tomato_model.ipynb`.

**Supported disease classes:**
- Tomato: Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria, Spider Mites, Target Spot, TYLCV, Mosaic Virus, Healthy

---

## 🗺️ Real-Time Outbreak Heatmap

The outbreak heatmap (`/scans/outbreak`) aggregates all geo-tagged predictions from the last N days.

- **Heatmap** mode: intensity = prediction confidence
- **Marker** mode: color-coded by disease type
- **Auto-refresh**: every 60 seconds
- **Demo data**: seeded automatically if no real data exists (20 Indian agricultural regions)

---

## 🌐 Multilingual Support

Language is stored in `localStorage`. Translations live in `frontend/translations/`:

| File | Language |
|---|---|
| `en.json` | English |
| `hi.json` | Hindi (हिन्दी) |
| `pa.json` | Punjabi (ਪੰਜਾਬੀ) |

To add a new language:
1. Create `frontend/translations/XX.json`
2. Add `<option value="XX">` to the `#langSelect` in all HTML files

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | Create account | ❌ |
| POST | `/auth/token` | Login → JWT | ❌ |
| GET | `/auth/me` | Current user | ✅ |
| POST | `/predict/` | Disease prediction | ✅ |
| GET | `/scans/history` | Scan history | ✅ |
| GET | `/scans/stats` | Dashboard analytics | ✅ |
| GET | `/scans/outbreak` | Heatmap data | ✅ |
| GET | `/health` | Health check | ❌ |

Interactive docs: `http://localhost:8000/api/docs`

---

## 🔒 Security

- Passwords hashed with **bcrypt**
- **JWT** tokens (HS256, 24h expiry)
- All prediction endpoints require authentication
- Input validation via **Pydantic**
- File type & size validation before processing

---

## 🛠️ Development Progress

| Stage | Feature | Status |
|---|---|---|
| 1 | Authentication (JWT + bcrypt) | ✅ Complete |
| 2 | Image Upload & Validation | ✅ Complete |
| 3 | AI Disease Prediction | ✅ Complete |
| 4 | Dashboard Analytics | ✅ Complete |
| 5 | Disease Map (Leaflet) | ✅ Complete |
| 6 | Multilingual (EN/HI/PA) | ✅ Complete |
| 7 | Real-Time Outbreak Heatmap | ✅ Complete |
| 8 | Docker Production Deploy | ✅ Complete |
