// ============================================
// 🗺️ MAP.JS - REAL DATA + HEATMAP VISIBLE
// ============================================

const MAP_API_BASE = "https://agroguard-ai-6xil.onrender.com";

let map;
let heatLayer = null;
let markerLayer = null;
let currentData = [];

// 🔥 Initialize map
document.addEventListener('DOMContentLoaded', function () {
    initMap();
    loadRealData();
    setupFilters();
    setupRefreshButton();
});

function initMap() {
    // India center
    map = L.map('map', {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: true
    });

    // Tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    console.log('🗺️ Map initialized');
}

// 🔥 LOAD REAL DATA
// 🔥 LOAD REAL DATA - WITH BETTER ERROR HANDLING
async function loadRealData() {
    const token = localStorage.getItem('access_token');

    console.log('🔑 Token:', token ? '✅ Present' : '❌ Missing');

    if (!token) {
        showNotification('⚠️ Please login first to view outbreak data', 'warning');
        document.getElementById('outbreakCount').textContent = '0';
        document.getElementById('farmersAffected').textContent = '0';
        showEmptyState();
        return;
    }

    try {
        const days = document.getElementById('daysFilter')?.value || 30;
        const url = `${MAP_API_BASE}/scans/outbreak?days=${days}`;
        console.log('📡 Fetching:', url);

        const response = await fetch(url, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        console.log('📡 Response status:', response.status);

        if (!response.ok) {
            if (response.status === 401) {
                showNotification('⚠️ Session expired. Please login again.', 'error');
                localStorage.removeItem('access_token');
                window.location.href = '/';
                return;
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('📍 Data received:', data.length, 'points');

        if (data && data.length > 0) {
            currentData = data;
            updateMap(data);
            updateStats(data);
            showNotification(`✅ ${data.length} outbreak points loaded`, 'success');
        } else {
            console.warn('⚠️ No outbreak data found');
            showNotification('No outbreak data. Scan some leaves!', 'info');
            showEmptyState();
            document.getElementById('outbreakCount').textContent = '0';
            document.getElementById('farmersAffected').textContent = '0';
        }

    } catch (error) {
        console.error('❌ Error loading data:', error);
        showNotification('Error loading data: ' + error.message, 'error');
        document.getElementById('outbreakCount').textContent = '0';
        document.getElementById('farmersAffected').textContent = '0';
        showEmptyState();
    }
}

// 🔥 UPDATE MAP WITH HEATMAP
function updateMap(data) {
    // Clear old layers
    if (heatLayer) {
        map.removeLayer(heatLayer);
        heatLayer = null;
    }
    if (markerLayer) {
        map.removeLayer(markerLayer);
        markerLayer = null;
    }

    if (!data || data.length === 0) {
        showEmptyState();
        return;
    }

    // 🔥 CREATE HEATMAP DATA
    const heatData = data.map(item => {
        const intensity = item.confidence || item.intensity || 0.5;
        return [item.latitude, item.longitude, intensity];
    });

    console.log('🔥 Heatmap points:', heatData.length);

    // 🔥 ADD HEATMAP LAYER
    heatLayer = L.heatLayer(heatData, {
        radius: 30,
        blur: 20,
        maxZoom: 10,
        gradient: {
            0.2: '#22c55e',   // Green - Low
            0.4: '#eab308',   // Yellow - Medium
            0.6: '#f97316',   // Orange - High
            0.8: '#ef4444',   // Red - Critical
            1.0: '#7f1d1d'    // Dark Red - Severe
        }
    }).addTo(map);

    // 🔥 ADD MARKERS (small dots)
    markerLayer = L.layerGroup();

    data.forEach(item => {
        const color = getDiseaseColor(item.disease_name);
        const marker = L.circleMarker([item.latitude, item.longitude], {
            radius: 6,
            fillColor: color,
            color: '#ffffff',
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.8
        });

        const popupHTML = `
            <div style="font-family: sans-serif; max-width: 220px;">
                <h4 style="color: #4caf50; margin: 0 0 4px 0;">🌿 ${item.disease_name || 'Unknown'}</h4>
                <p style="margin: 2px 0; font-size: 12px;">
                    <strong>Confidence:</strong> ${(item.confidence * 100).toFixed(1)}%
                </p>
                <p style="margin: 2px 0; font-size: 12px;">
                    <strong>Location:</strong> ${item.location_name || 'Unknown'}
                </p>
                <p style="margin: 2px 0; font-size: 11px; color: #666;">
                    ${item.created_at ? new Date(item.created_at).toLocaleDateString() : ''}
                </p>
            </div>
        `;

        marker.bindPopup(popupHTML);
        markerLayer.addLayer(marker);
    });

    markerLayer.addTo(map);

    // Fit bounds
    if (data.length > 1) {
        const bounds = data.map(d => [d.latitude, d.longitude]);
        map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50] });
    }
}

// 🔥 GET COLOR BY DISEASE
function getDiseaseColor(diseaseName) {
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

// 🔥 UPDATE STATS
function updateStats(data) {
    const totalEl = document.getElementById('totalOutbreaks');
    const farmersEl = document.getElementById('farmersAffected');
    const severityEl = document.getElementById('severityLevels');

    if (totalEl) totalEl.textContent = data.length;
    if (farmersEl) farmersEl.textContent = (data.length * 10) + '+';

    if (severityEl) {
        const critical = data.filter(d => d.confidence > 0.8).length;
        const high = data.filter(d => d.confidence > 0.6 && d.confidence <= 0.8).length;
        const medium = data.filter(d => d.confidence > 0.4 && d.confidence <= 0.6).length;
        const low = data.filter(d => d.confidence <= 0.4).length;
        severityEl.innerHTML = `
            <span style="color:#7f1d1d;">🔴 Critical: ${critical}</span><br>
            <span style="color:#ef4444;">🟠 High: ${high}</span><br>
            <span style="color:#eab308;">🟡 Medium: ${medium}</span><br>
            <span style="color:#22c55e;">🟢 Low: ${low}</span>
        `;
    }
}

// 🔥 FILTERS
function setupFilters() {
    const filterSelect = document.getElementById('diseaseFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function () {
            const value = this.value;
            if (value === 'all') {
                updateMap(currentData);
            } else {
                const filtered = currentData.filter(d =>
                    d.disease_name?.toLowerCase().includes(value.toLowerCase())
                );
                updateMap(filtered);
            }
        });
    }

    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const days = parseInt(this.dataset.days);
            loadDataForDays(days);
        });
    });
}

async function loadDataForDays(days) {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
        const response = await fetch(`${MAP_API_BASE}/scans/outbreak?days=${days}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await response.json();
        currentData = data;
        updateMap(data);
        updateStats(data);
        showNotification(`✅ ${data.length} points (${days} days)`, 'success');
    } catch (error) {
        console.error('Error:', error);
    }
}

function setupRefreshButton() {
    const refreshBtn = document.getElementById('refreshData');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            this.textContent = '⏳ Loading...';
            loadRealData();
            setTimeout(() => { this.textContent = '🔄 Refresh Data'; }, 2000);
        });
    }
}

function showEmptyState() {
    // Remove old empty message
    const oldMsg = document.getElementById('emptyMapMsg');
    if (oldMsg) oldMsg.remove();

    const container = document.getElementById('map');
    if (!container) return;

    const msg = document.createElement('div');
    msg.id = 'emptyMapMsg';
    msg.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.85);
        color: white;
        padding: 30px 40px;
        border-radius: 16px;
        text-align: center;
        z-index: 1000;
        max-width: 350px;
    `;
    msg.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 10px;">🗺️</div>
        <h3 style="margin: 0 0 10px 0;">No Outbreak Data</h3>
        <p style="font-size: 0.9rem; color: #aaa; margin: 0 0 15px 0;">
            Scan some leaves to generate outbreak data.<br>
            Real-time disease spread will appear here.
        </p>
        <a href="/" style="display: inline-block; padding: 10px 24px; background: #4caf50; color: white; border-radius: 8px; text-decoration: none; font-weight: 500;">
            📸 Scan Now
        </a>
    `;
    container.style.position = 'relative';
    container.appendChild(msg);
}

function showNotification(message, type = 'info') {
    if (typeof notify === 'function') {
        notify(message, type);
    } else {
        console.log(`[${type}] ${message}`);
    }
}


console.log('🗺️ Map.js loaded with real data + heatmap!');