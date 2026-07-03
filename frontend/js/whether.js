// ========================================
// WEATHER.JS - Weather functionality
// ========================================

const WEATHER_API_KEY = "api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}"; // 👈 REPLACE THIS

// Fetch weather using coordinates
async function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            updateWeatherUI(data);
            console.log("✅ Weather loaded:", data.name, data.main.temp + "°C");
        } else {
            console.error("❌ Weather API error:", data.message);
        }
    } catch (error) {
        console.error("❌ Weather fetch error:", error);
    }
}

// Update the dashboard/UI with weather data
function updateWeatherUI(data) {
    // Try to find weather elements on the page
    const tempEl = document.getElementById('weatherTemp');
    const humidityEl = document.getElementById('weatherHumidity');
    const windEl = document.getElementById('weatherWind');
    const feelsEl = document.getElementById('weatherFeels');
    const locationEl = document.getElementById('weatherLocation');
    const diseaseRiskEl = document.getElementById('diseaseRisk');

    if (tempEl) tempEl.textContent = data.main.temp + '°C';
    if (humidityEl) humidityEl.textContent = data.main.humidity + '%';
    if (windEl) windEl.textContent = data.wind.speed + ' km/h';
    if (feelsEl) feelsEl.textContent = 'Feels ' + data.main.feels_like + '°C';
    if (locationEl) locationEl.textContent = '📍 ' + data.name + ', ' + data.sys.country;

    // Update disease risk based on weather conditions
    if (diseaseRiskEl) {
        const risk = calculateDiseaseRisk(data);
        diseaseRiskEl.textContent = risk;
        diseaseRiskEl.style.color = risk === 'High' ? '#dc2626' : risk === 'Medium' ? '#f59e0b' : '#22c55e';
    }
}

// Calculate disease risk based on weather
function calculateDiseaseRisk(data) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;

    // High risk: warm (20-30°C) + high humidity (>70%)
    if (temp >= 20 && temp <= 30 && humidity > 70) {
        return 'High';
    }
    // Medium risk: moderate conditions
    else if ((temp >= 15 && temp < 20) || (temp > 30 && temp <= 35) || (humidity >= 50 && humidity <= 70)) {
        return 'Medium';
    }
    // Low risk: cool or dry conditions
    else {
        return 'Low';
    }
}

// Get location by IP (fallback)
async function fetchWeatherByIP() {
    try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        if (ipData.latitude && ipData.longitude) {
            fetchWeather(ipData.latitude, ipData.longitude);
            console.log("📍 Location found via IP");
        }
    } catch (error) {
        console.error("❌ IP location failed:", error);
    }
}

// Get user's location via GPS
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetchWeather(lat, lon);
                console.log("📍 Location found via GPS");
            },
            (error) => {
                console.log("⚠️ GPS denied, using IP fallback");
                fetchWeatherByIP();
            }
        );
    } else {
        console.log("⚠️ Geolocation not supported, using IP");
        fetchWeatherByIP();
    }
}

// Auto-load weather when page is ready
document.addEventListener("DOMContentLoaded", function () {
    // Check if weather elements exist on page
    const hasWeatherElements = document.getElementById('weatherTemp') ||
        document.getElementById('weatherLocation');
    if (hasWeatherElements) {
        getUserLocation();
    }
});

// Also try when page is fully loaded (for dynamic content)
window.addEventListener('load', function () {
    // If weather wasn't loaded by DOMContentLoaded, try again
    const tempEl = document.getElementById('weatherTemp');
    if (tempEl && tempEl.textContent === '--°C') {
        getUserLocation();
    }
});