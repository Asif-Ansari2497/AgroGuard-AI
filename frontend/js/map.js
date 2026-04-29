/**
 * AgroGuard AI — Disease Outbreak Map
 * Professional Design with Better Markers - FIXED VERSION
 */

let map;
let markers = [];
let currentView = 'markers';
let heatLayer = null;

// Custom marker colors by disease
const COLORS = {
    'Late Blight': '#dc2626',
    'Early Blight': '#f59e0b',
    'Healthy': '#6aad3d',
    'default': '#9ca3af'
};

// Custom icons for different disease types
function getMarkerIcon(disease, isSelected = false) {
    const color = COLORS[disease] || COLORS.default;
    const size = isSelected ? 36 : 28;
    const borderWidth = isSelected ? 3 : 2;

    return L.divIcon({
        html: `
            <div style="
                width: ${size}px; 
                height: ${size}px; 
                background: ${color}; 
                border: ${borderWidth}px solid white; 
                border-radius: 50%; 
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                display: flex; 
                align-items: center; 
                justify-content: center;
                transition: all 0.2s ease;
                cursor: pointer;
            ">
                <span style="font-size: ${size - 10}px;">🌿</span>
            </div>
        `,
        iconSize: [size, size],
        className: 'custom-marker'
    });
}

// Demo points across India with detailed info
const indiaOutbreaks = [
    // NORTH INDIA
    { lat: 30.90, lng: 75.85, name: 'Ludhiana', state: 'Punjab', disease: 'Late Blight', confidence: 94, severity: 'Critical', farmers: 45, date: '2024-04-15' },
    { lat: 31.33, lng: 75.58, name: 'Jalandhar', state: 'Punjab', disease: 'Early Blight', confidence: 88, severity: 'Medium', farmers: 32, date: '2024-04-14' },
    { lat: 30.21, lng: 74.95, name: 'Bathinda', state: 'Punjab', disease: 'Late Blight', confidence: 91, severity: 'Critical', farmers: 28, date: '2024-04-13' },
    { lat: 28.61, lng: 77.20, name: 'New Delhi', state: 'Delhi', disease: 'Late Blight', confidence: 85, severity: 'High', farmers: 56, date: '2024-04-12' },
    { lat: 29.06, lng: 76.09, name: 'Hisar', state: 'Haryana', disease: 'Early Blight', confidence: 79, severity: 'Medium', farmers: 23, date: '2024-04-11' },

    // WEST INDIA
    { lat: 19.08, lng: 72.88, name: 'Mumbai', state: 'Maharashtra', disease: 'Early Blight', confidence: 74, severity: 'Medium', farmers: 67, date: '2024-04-10' },
    { lat: 18.52, lng: 73.86, name: 'Pune', state: 'Maharashtra', disease: 'Late Blight', confidence: 83, severity: 'High', farmers: 89, date: '2024-04-09' },
    { lat: 23.02, lng: 72.57, name: 'Ahmedabad', state: 'Gujarat', disease: 'Early Blight', confidence: 68, severity: 'Medium', farmers: 34, date: '2024-04-08' },
    { lat: 26.91, lng: 75.79, name: 'Jaipur', state: 'Rajasthan', disease: 'Late Blight', confidence: 91, severity: 'Critical', farmers: 41, date: '2024-04-07' },

    // SOUTH INDIA
    { lat: 13.08, lng: 80.27, name: 'Chennai', state: 'Tamil Nadu', disease: 'Early Blight', confidence: 73, severity: 'Medium', farmers: 78, date: '2024-04-06' },
    { lat: 12.97, lng: 77.59, name: 'Bangalore', state: 'Karnataka', disease: 'Healthy', confidence: 94, severity: 'None', farmers: 12, date: '2024-04-05' },
    { lat: 17.39, lng: 78.49, name: 'Hyderabad', state: 'Telangana', disease: 'Late Blight', confidence: 84, severity: 'High', farmers: 94, date: '2024-04-04' },
    { lat: 11.02, lng: 76.96, name: 'Coimbatore', state: 'Tamil Nadu', disease: 'Early Blight', confidence: 81, severity: 'Medium', farmers: 45, date: '2024-04-03' },
    { lat: 8.52, lng: 76.94, name: 'Thiruvananthapuram', state: 'Kerala', disease: 'Late Blight', confidence: 75, severity: 'Medium', farmers: 23, date: '2024-04-02' },

    // EAST INDIA
    { lat: 22.57, lng: 88.36, name: 'Kolkata', state: 'West Bengal', disease: 'Late Blight', confidence: 89, severity: 'High', farmers: 67, date: '2024-04-01' },
    { lat: 25.59, lng: 85.14, name: 'Patna', state: 'Bihar', disease: 'Early Blight', confidence: 77, severity: 'Medium', farmers: 34, date: '2024-03-31' },
    { lat: 20.30, lng: 85.82, name: 'Bhubaneswar', state: 'Odisha', disease: 'Late Blight', confidence: 72, severity: 'Medium', farmers: 18, date: '2024-03-30' },

    // CENTRAL INDIA
    { lat: 23.26, lng: 77.41, name: 'Bhopal', state: 'Madhya Pradesh', disease: 'Late Blight', confidence: 65, severity: 'Medium', farmers: 21, date: '2024-03-29' },
    { lat: 21.15, lng: 79.09, name: 'Nagpur', state: 'Maharashtra', disease: 'Early Blight', confidence: 84, severity: 'High', farmers: 56, date: '2024-03-28' },
    { lat: 26.85, lng: 80.95, name: 'Lucknow', state: 'Uttar Pradesh', disease: 'Late Blight', confidence: 88, severity: 'High', farmers: 43, date: '2024-03-27' },
    { lat: 27.18, lng: 78.01, name: 'Agra', state: 'Uttar Pradesh', disease: 'Healthy', confidence: 96, severity: 'None', farmers: 8, date: '2024-03-26' },

    // NORTHEAST INDIA
    { lat: 26.14, lng: 91.74, name: 'Guwahati', state: 'Assam', disease: 'Early Blight', confidence: 78, severity: 'Medium', farmers: 15, date: '2024-03-25' }
];

document.addEventListener('DOMContentLoaded', () => {
    console.log('🗺️ Map loading...');
    initMap();
    addOutbreakMarkers();
    updateStats();

    // Setup event listeners
    const toggleBtn = document.getElementById('toggleHeatmap');
    const refreshBtn = document.getElementById('refreshMap');
    const diseaseFilter = document.getElementById('diseaseFilter');

    if (toggleBtn) toggleBtn.addEventListener('click', toggleView);
    if (refreshBtn) refreshBtn.addEventListener('click', () => refreshMap());
    if (diseaseFilter) diseaseFilter.addEventListener('change', (e) => filterByDisease(e.target.value));
});

function initMap() {
    map = L.map('map').setView([23.5, 80.0], 5);

    // Beautiful tile layer with better styling
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
        subdomains: 'abcd',
        maxZoom: 19,
        className: 'map-tiles'
    }).addTo(map);

    // Add scale control
    L.control.scale({ metric: true, imperial: false, position: 'bottomleft' }).addTo(map);
}

function addOutbreakMarkers() {
    // Clear existing markers
    markers.forEach(m => map.removeLayer(m));
    markers = [];

    indiaOutbreaks.forEach((point, index) => {
        const color = COLORS[point.disease] || COLORS.default;
        const severityIcon = point.severity === 'Critical' ? '🔴' : point.severity === 'High' ? '🟠' : point.severity === 'Medium' ? '🟡' : '🟢';

        // Store point data on marker for filtering
        const marker = L.marker([point.lat, point.lng], {
            icon: getMarkerIcon(point.disease)
        }).addTo(map);

        // Beautiful popup HTML
        const popupHTML = `
            <div style="min-width: 260px; font-family: 'Segoe UI', sans-serif;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; border-bottom: 2px solid ${color}; padding-bottom: 8px;">
                    <div style="width: 40px; height: 40px; background: ${color}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                        🌿
                    </div>
                    <div>
                        <h3 style="margin: 0; color: ${color}; font-size: 16px;">${point.disease}</h3>
                        <p style="margin: 0; font-size: 11px; color: #666;">${severityIcon} ${point.severity} Severity</p>
                    </div>
                </div>
                
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                        <span>📍</span>
                        <span><strong>${point.name}</strong>, ${point.state}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                        <span>🎯</span>
                        <span>Confidence: <strong style="color: ${color};">${point.confidence}%</strong></span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                        <span>👨‍🌾</span>
                        <span>Farmers affected: <strong>${point.farmers.toLocaleString()}</strong></span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>📅</span>
                        <span>Reported: ${new Date(point.date).toLocaleDateString()}</span>
                    </div>
                </div>
                
                <div style="background: #f0f0f0; padding: 8px; border-radius: 8px; margin-top: 8px; font-size: 12px;">
                    <span>⚠️</span> Take immediate preventive measures
                </div>
                
                <button onclick="alert('View details for ${point.name}')" style="
                    width: 100%; 
                    margin-top: 10px; 
                    padding: 8px; 
                    background: ${color}; 
                    color: white; 
                    border: none; 
                    border-radius: 6px; 
                    cursor: pointer;
                    font-weight: bold;
                ">
                    View Treatment Details →
                </button>
            </div>
        `;

        marker.bindPopup(popupHTML, {
            maxWidth: 300,
            minWidth: 260,
            className: 'custom-popup'
        });

        // Store disease type on marker for filtering
        marker.diseaseType = point.disease;
        marker.pointData = point;

        markers.push(marker);
    });

    // Fit bounds to show all markers
    if (markers.length > 0) {
        const bounds = L.latLngBounds(markers.map(m => m.getLatLng()));
        map.fitBounds(bounds, { padding: [50, 50] });
    }

    console.log(`✅ Added ${markers.length} outbreak markers`);
}

function updateStats() {
    // Update total outbreaks count
    const countElem = document.getElementById('outbreakCount');
    if (countElem) countElem.innerText = markers.length;

    // Calculate affected farmers
    const totalFarmers = indiaOutbreaks.reduce((sum, p) => sum + p.farmers, 0);
    const farmersElem = document.getElementById('farmersAffected');
    if (farmersElem) farmersElem.innerText = totalFarmers.toLocaleString();

    // Calculate severity breakdown - FIXED to use individual elements
    const criticalCount = indiaOutbreaks.filter(p => p.severity === 'Critical').length;
    const highCount = indiaOutbreaks.filter(p => p.severity === 'High').length;
    const mediumCount = indiaOutbreaks.filter(p => p.severity === 'Medium').length;
    const noneCount = indiaOutbreaks.filter(p => p.severity === 'None').length;

    // Update individual severity count elements
    const criticalElem = document.getElementById('criticalCount');
    const highElem = document.getElementById('highCount');
    const mediumElem = document.getElementById('mediumCount');
    const lowElem = document.getElementById('lowCount');

    if (criticalElem) criticalElem.innerText = criticalCount;
    if (highElem) highElem.innerText = highCount;
    if (mediumElem) mediumElem.innerText = mediumCount;
    if (lowElem) lowElem.innerText = noneCount;
}

function filterByDisease(disease) {
    console.log('Filtering by:', disease);

    markers.forEach(marker => {
        if (disease === 'all') {
            map.addLayer(marker);
        } else {
            if (marker.diseaseType === disease) {
                map.addLayer(marker);
            } else {
                map.removeLayer(marker);
            }
        }
    });
}

function refreshMap() {
    addOutbreakMarkers();
    updateStats();

    const statusDiv = document.getElementById('mapStatus');
    if (statusDiv) {
        statusDiv.style.display = 'block';
        statusDiv.innerHTML = '✅ Map refreshed with latest outbreak data';
        statusDiv.className = 'alert alert-success';
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 3000);
    }
}

function toggleView() {
    const btn = document.getElementById('toggleHeatmap');
    if (currentView === 'heatmap') {
        currentView = 'markers';
        btn.innerHTML = '🔥 Show Heatmap';
        btn.style.background = '#f59e0b';

        // Remove heatmap if exists
        if (heatLayer) map.removeLayer(heatLayer);

        // Show markers
        markers.forEach(m => map.addLayer(m));

    } else {
        currentView = 'heatmap';
        btn.innerHTML = '📍 Show Markers';
        btn.style.background = '#6aad3d';

        // Hide markers
        markers.forEach(m => map.removeLayer(m));

        // Create heatmap data
        const heatData = indiaOutbreaks.map(p => [p.lat, p.lng, p.confidence / 100]);
        heatLayer = L.heatLayer(heatData, {
            radius: 25,
            blur: 15,
            maxZoom: 10,
            minOpacity: 0.4,
            gradient: {
                0.2: '#4caf50',
                0.4: '#ffeb3b',
                0.6: '#ff9800',
                0.8: '#f44336',
                1.0: '#d32f2f'
            }
        }).addTo(map);
    }
}

// Add custom CSS for popups
const style = document.createElement('style');
style.textContent = `
    .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        padding: 0;
    }
    .custom-popup .leaflet-popup-tip {
        background: white;
    }
    .custom-marker:hover div {
        transform: scale(1.1);
        transition: transform 0.2s;
    }
`;
document.head.appendChild(style);