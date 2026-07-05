// ============================================
// 🗺️ MAP.JS - REAL DATA FROM BACKEND
// ============================================

const MAP_API_BASE = "https://agroguard-ai-6xil.onrender.com";

let map;
let heatmapLayer;
let markerLayer;
let currentData = [];
let currentFilter = 'all';

// 🔥 Initialize map
document.addEventListener('DOMContentLoaded', function () {
    initMap();
    loadRealData();
    setupFilters();
});

function initMap() {
    // India center coordinates
    const indiaCenter = [20.5937, 78.9629];

    map = L.map('map').setView(indiaCenter, 5);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// 🔥 LOAD REAL DATA FROM BACKEND
async function loadRealData() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.warn('⚠️ No token found, showing empty map');
        showNotification('Please login to view outbreak data', 'warning');
        return;
    }

    try {
        const response = await fetch(`${MAP_API_BASE}/scans/outbreak?days=30`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        console.log('📍 Real Data Loaded:', data);

        if (data && data.length > 0) {
            currentData = data;
            updateMap(data);
            showNotification(`✅ ${data.length} outbreak points loaded`, 'success');
        } else {
            console.warn('⚠️ No outbreak data found');
            showNotification('No outbreak data available. Scan some leaves!', 'info');
            // Show empty map with message
            showEmptyState();
        }

    } catch (error) {
        console.error('❌ Error loading outbreak data:', error);
        showNotification('Error loading data: ' + error.message, 'error');
        showEmptyState();
    }
}

function updateMap(data) {
    // Clear existing layers
    if (heatmapLayer) {
        map.removeLayer(heatmapLayer);
    }
    if (markerLayer) {
        map.removeLayer(markerLayer);
    }

    // Filter data if needed
    let filteredData = data;
    if (currentFilter !== 'all') {
        filteredData = data.filter(item =>
            item.disease_name?.toLowerCase().includes(currentFilter.toLowerCase())
        );
    }

    if (filteredData.length === 0) {
        showNotification('No data for selected filter', 'info');
        return;
    }

    // 🔥 Create heatmap data
    const heatData = filteredData.map(item => {
        const intensity = item.confidence || item.intensity || 0.5;
        return [item.latitude, item.longitude, intensity];
    });

    // Add heatmap layer
    heatmapLayer = L.heatLayer(heatData, {
        radius: 25,
        blur: 15,
        maxZoom: 10,
        gradient: {
            0.2: '#22c55e',   // Green - Low
            0.4: '#eab308',   // Yellow - Medium
            0.6: '#f97316',   // Orange - High
            0.8: '#ef4444',   // Red - Critical
            1.0: '#7f1d1d'    // Dark Red - Severe
        }
    }).addTo(map);

    // Add markers with popups
    markerLayer = L.layerGroup();
    filteredData.forEach(item => {
        const marker = L.circleMarker([item.latitude, item.longitude], {
            radius: 8,
            fillColor: getColorByDisease(item.disease_name),
            color: '#fff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });

        // Popup content
        const popupContent = `
            <div style="max-width:250px; font-family: sans-serif;">
                <h4 style="color:#4caf50; margin:0 0 5px 0;">🌿 ${item.disease_name || 'Unknown Disease'}</h4>
                <p style="margin:2px 0; font-size:12px;">
                    <strong>Confidence:</strong> ${(item.confidence * 100).toFixed(1)}%
                </p>
                <p style="margin:2px 0; font-size:12px;">
                    <strong>Location:</strong> ${item.location_name || 'Unknown'}
                </p>
                <p style="margin:2px 0; font-size:11px; color:#666;">
                    ${new Date(item.created_at).toLocaleDateString()}
                </p>
            </div>
        `;

        marker.bindPopup(popupContent);
        markerLayer.addLayer(marker);
    });
    markerLayer.addTo(map);

    // Fit map to data bounds
    if (filteredData.length > 0) {
        const bounds = filteredData.map(d => [d.latitude, d.longitude]);
        const latLngBounds = L.latLngBounds(bounds);
        map.fitBounds(latLngBounds, { padding: [50, 50] });
    }
}

function getColorByDisease(diseaseName) {
    if (!diseaseName) return '#6b7280';

    const name = diseaseName.toLowerCase();
    if (name.includes('late blight')) return '#ef4444';
    if (name.includes('early blight')) return '#f97316';
    if (name.includes('healthy')) return '#22c55e';
    if (name.includes('rust')) return '#eab308';
    if (name.includes('spot')) return '#8b5cf6';
    if (name.includes('mildew')) return '#a855f7';
    return '#6b7280';
}

function setupFilters() {
    const filterSelect = document.getElementById('diseaseFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            currentFilter = this.value;
            if (currentData.length > 0) {
                updateMap(currentData);
            }
        });
    }

    // Time period buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const days = parseInt(this.dataset.days);
            loadRealDataForDays(days);
        });
    });
}

async function loadRealDataForDays(days) {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
        const response = await fetch(`${MAP_API_BASE}/scans/outbreak?days=${days}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (response.ok) {
            const data = await response.json();
            currentData = data;
            updateMap(data);
            showNotification(`✅ ${data.length} points loaded (${days} days)`, 'success');
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function showEmptyState() {
    // Show message on map
    const emptyMsg = document.createElement('div');
    emptyMsg.id = 'emptyMapMsg';
    emptyMsg.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 30px;
        border-radius: 16px;
        text-align: center;
        z-index: 1000;
        max-width: 350px;
    `;
    emptyMsg.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 10px;">🗺️</div>
        <h3>No Outbreak Data</h3>
        <p style="font-size: 0.9rem; color: #aaa;">Scan some leaves to generate outbreak data. Real-time disease spread will appear here.</p>
        <a href="/" style="display: inline-block; margin-top: 10px; padding: 8px 20px; background: #4caf50; color: white; border-radius: 8px; text-decoration: none;">Scan Now</a>
    `;
    document.getElementById('map-container')?.appendChild(emptyMsg);
}

function showNotification(message, type = 'info') {
    // Use your existing notify function
    if (typeof notify === 'function') {
        notify(message, type);
    } else {
        console.log(`[${type}] ${message}`);
    }
}

console.log('🗺️ Map.js loaded with real data!');