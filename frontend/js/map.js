// ============================================
// 🗺️ MAP.JS - WITH FALLBACK & DYNAMIC LOADING
// ============================================

const MAP_API_BASE = "https://agroguard-ai-6xil.onrender.com";

let map;
let heatLayer = null;
let markerLayer = null;
let currentData = [];
let isHeatLoaded = false;

// 🔥 CHECK IF HEAT PLUGIN IS LOADED
function ensureHeatPlugin() {
    return new Promise((resolve) => {
        if (typeof L.heatLayer !== 'undefined') {
            console.log('✅ Heat plugin already loaded!');
            isHeatLoaded = true;
            resolve(true);
            return;
        }

        console.warn('⚠️ L.heatLayer not defined. Loading from CDN...');

        // Dynamic load from CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet-heat/0.2.0/leaflet-heat.js';
        script.onload = function () {
            console.log('✅ Heat plugin loaded dynamically!');
            isHeatLoaded = true;
            resolve(true);
        };
        script.onerror = function () {
            console.error('❌ Failed to load heat plugin from CDN!');
            isHeatLoaded = false;
            resolve(false);
        };
        document.head.appendChild(script);

        // Timeout after 5 seconds
        setTimeout(() => {
            if (!isHeatLoaded) {
                console.warn('⏰ Heat plugin load timeout. Using markers only.');
                isHeatLoaded = false;
                resolve(false);
            }
        }, 5000);
    });
}

// 🔥 Initialize map
document.addEventListener('DOMContentLoaded', async function () {
    initMap();

    // Wait for heat plugin to load
    await ensureHeatPlugin();

    // Load data
    await loadRealData();
    setupFilters();
    setupRefreshButton();

    console.log('🗺️ Map fully initialized!');
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
            updateSeverityCounts([]);
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

    // 🔥 SAFETY CHECK - If heat not loaded, use markers only
    if (!isHeatLoaded || typeof L.heatLayer === 'undefined') {
        console.warn('⚠️ Heat plugin not available. Showing markers only.');
        addMarkersOnly(data);
        showNotification('Showing disease markers (heatmap unavailable)', 'info');
        return;
    }

    try {
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

        console.log('✅ Heatmap added successfully!');

    } catch (error) {
        console.error('❌ Error adding heatmap:', error);
        // Fallback to markers only
        addMarkersOnly(data);
        showNotification('Heatmap error. Showing markers only.', 'warning');
        return;
    }

    // 🔥 ADD MARKERS (small dots)
    addMarkers(data);
}

// 🔥 ADD MARKERS ONLY (Fallback when heatmap fails)
function addMarkersOnly(data) {
    console.log('📍 Showing markers only (fallback mode)');

    markerLayer = L.layerGroup();

    data.forEach(item => {
        const color = getDiseaseColor(item.disease_name);
        const marker = L.circleMarker([item.latitude, item.longitude], {
            radius: 10,
            fillColor: color,
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
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
                <p style="margin: 2px 0; font-size: 11px; color: #888;">
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
        try {
            const bounds = data.map(d => [d.latitude, d.longitude]);
            map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50] });
        } catch (e) {
            console.warn('Could not fit bounds:', e);
        }
    }
}

// 🔥 ADD MARKERS WITH HEATMAP
function addMarkers(data) {
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
                <p style="margin: 2px 0; font-size: 11px; color: #888;">
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
        try {
            const bounds = data.map(d => [d.latitude, d.longitude]);
            map.fitBounds(L.latLngBounds(bounds), { padding: [50, 50] });
        } catch (e) {
            console.warn('Could not fit bounds:', e);
        }
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
    if (name.includes('mosaic')) return '#ec4899';
    if (name.includes('yellow')) return '#fbbf24';
    return '#6b7280';
}

// 🔥 UPDATE STATS
function updateStats(data) {
    const totalEl = document.getElementById('outbreakCount');
    const farmersEl = document.getElementById('farmersAffected');

    if (totalEl) totalEl.textContent = data.length || '0';
    if (farmersEl) farmersEl.textContent = data.length ? (data.length * 10) + '+' : '0';

    updateSeverityCounts(data);
}

function updateSeverityCounts(data) {
    const critical = data.filter(d => d.confidence > 0.8).length || 0;
    const high = data.filter(d => d.confidence > 0.6 && d.confidence <= 0.8).length || 0;
    const medium = data.filter(d => d.confidence > 0.4 && d.confidence <= 0.6).length || 0;
    const low = data.filter(d => d.confidence <= 0.4).length || 0;

    document.getElementById('criticalCount').textContent = critical;
    document.getElementById('highCount').textContent = high;
    document.getElementById('mediumCount').textContent = medium;
    document.getElementById('lowCount').textContent = low;
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

    const daysFilter = document.getElementById('daysFilter');
    if (daysFilter) {
        daysFilter.addEventListener('change', function () {
            const days = parseInt(this.value);
            loadDataForDays(days);
        });
    }

    // Time period buttons (if any)
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const days = parseInt(this.dataset.days);
            loadDataForDays(days);
        });
    });

    // Toggle heatmap button
    const toggleBtn = document.getElementById('toggleHeatmap');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            if (currentData.length > 0) {
                updateMap(currentData);
                showNotification('🔄 Map updated!', 'success');
            } else {
                showNotification('No data to display. Scan some leaves!', 'warning');
            }
        });
    }
}

async function loadDataForDays(days) {
    const token = localStorage.getItem('access_token');
    if (!token) {
        showNotification('Please login first', 'warning');
        return;
    }

    try {
        const response = await fetch(`${MAP_API_BASE}/scans/outbreak?days=${days}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!response.ok) throw new Error('Failed to load data');

        const data = await response.json();
        currentData = data;
        updateMap(data);
        updateStats(data);
        showNotification(`✅ ${data.length} points (${days} days)`, 'success');
    } catch (error) {
        console.error('Error loading data:', error);
        showNotification('Error loading data: ' + error.message, 'error');
    }
}

function setupRefreshButton() {
    const refreshBtn = document.getElementById('refreshMap');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            this.textContent = '⏳ Loading...';
            this.disabled = true;
            loadRealData();
            setTimeout(() => {
                this.textContent = '🔄 Refresh';
                this.disabled = false;
            }, 2000);
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
        pointer-events: none;
    `;
    msg.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 10px;">🗺️</div>
        <h3 style="margin: 0 0 10px 0;">No Outbreak Data</h3>
        <p style="font-size: 0.9rem; color: #aaa; margin: 0 0 15px 0;">
            Scan some leaves to generate outbreak data.<br>
            Real-time disease spread will appear here.
        </p>
        <a href="/" style="display: inline-block; padding: 10px 24px; background: #4caf50; color: white; border-radius: 8px; text-decoration: none; font-weight: 500; pointer-events: auto;">
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
        const colors = {
            success: '#22c55e',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        console.log(`[${type}] ${message}`);
        // Simple alert fallback
        if (type === 'error') {
            alert(message);
        }
    }
}

console.log('🗺️ Map.js loaded with real data + heatmap!');