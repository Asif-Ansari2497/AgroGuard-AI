// ============================================
// COMPLETE PROFILE.JS - FIXED VERSION
// ============================================

const GEOCODE_API_KEY = "6a4abe8087914150601367xmgecccec";

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.log('No token found - staying on page');
    return;
  }

  await loadUser();
  await loadStats();
  await loadWeather();
  setupEvents();
  loadSavedAvatar();
});

async function loadUser() {
  try {
    const res = await fetch(`${window.API_BASE}/auth/me`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    });
    if (res.ok) {
      const user = await res.json();
      document.getElementById('profileName').innerText = user.name || 'Farmer';
      document.getElementById('profileEmail').innerText = user.email;
      document.getElementById('profileMemberSince').innerText = user.created_at ? new Date(user.created_at).toLocaleDateString() : '—';

      document.getElementById('navUserName').innerText = user.name?.split(' ')[0] || 'User';
      document.getElementById('navAvatar').innerText = user.name?.charAt(0).toUpperCase() || 'U';

      // Avatar
      const avatar = document.getElementById('profileAvatar');
      if (avatar && user.name) {
        avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4caf50&color=fff&size=128`;
      }

      // 🔥 EXACT LOCATION using GPS
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          try {
            const geoRes = await fetch(
              `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${GEOCODE_API_KEY}`
            );
            const geoData = await geoRes.json();
            const address = geoData.address || {};

            const village = address.village || address.town || address.city || "";
            const district = address.county || address.state_district || "";
            const state = address.state || "";
            const postcode = address.postcode || "";

            const exactLocation = [village, district, state, postcode].filter(Boolean).join(", ");
            document.getElementById('profileLocation').innerText = exactLocation || user.location || 'Not set';
            console.log("📍 Exact Location:", exactLocation);
          } catch (e) {
            document.getElementById('profileLocation').innerText = user.location || 'Not set';
          }
        }, () => {
          document.getElementById('profileLocation').innerText = user.location || 'Not set';
        });
      } else {
        document.getElementById('profileLocation').innerText = user.location || 'Not set';
      }

      if (user.location && user.location !== 'Not set') {
        document.getElementById('weatherLocation').innerHTML = `📍 ${user.location}`;
      }
    }
  } catch (e) { console.error(e); }
}

function loadSavedAvatar() {
  const email = document.getElementById('profileEmail')?.innerText;
  if (email) {
    const savedAvatar = localStorage.getItem(`avatar_${email}`);
    if (savedAvatar) {
      document.getElementById('profileAvatar').src = savedAvatar;
    }
  }
}

function setDefaultAvatar() {
  const avatar = document.getElementById('profileAvatar');
  if (avatar) {
    const currentSrc = avatar.src || '';
    if (!currentSrc || currentSrc.includes('null') || currentSrc.includes('undefined')) {
      const name = document.getElementById('profileName')?.innerText || 'User';
      avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4caf50&color=fff&size=128`;
    }
  }
}

async function loadStats() {
  try {
    const res = await fetch(`${window.API_BASE}/scans/stats`, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('access_token') }
    });
    if (res.ok) {
      const stats = await res.json();
      document.getElementById('statScans').innerText = stats.total_scans || 0;

      let most = stats.most_common_disease || 'None';
      most = most.replace('Tomato_', '').replace(/_/g, ' ');
      document.getElementById('statMostDisease').innerText = most;

      const points = localStorage.getItem('user_points') || 0;
      const streak = localStorage.getItem('user_streak') || 0;
      document.getElementById('statPoints').innerText = points;
      document.getElementById('statStreak').innerText = streak;

      const scans = stats.total_scans || 0;
      let level = 1, title = 'Seedling', emoji = '🌱';
      if (scans >= 100) { level = 7; title = 'Master Farmer'; emoji = '👨‍🌾'; }
      else if (scans >= 75) { level = 6; title = 'Expert Farmer'; emoji = '🌟'; }
      else if (scans >= 50) { level = 5; title = 'Advanced Farmer'; emoji = '🏆'; }
      else if (scans >= 30) { level = 4; title = 'Skilled Farmer'; emoji = '🌳'; }
      else if (scans >= 15) { level = 3; title = 'Growing Farmer'; emoji = '🍃'; }
      else if (scans >= 5) { level = 2; title = 'Budding Farmer'; emoji = '🌿'; }

      document.getElementById('profileLevel').innerHTML = `${emoji} Level ${level} — ${title}`;
    }
  } catch (e) { console.error(e); }
}

async function loadWeather() {
  // 🔥 Use GPS coordinates directly
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        // Get exact location name
        const geoRes = await fetch(
          `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${GEOCODE_API_KEY}`
        );
        const geoData = await geoRes.json();
        const address = geoData.address || {};

        const village = address.village || address.town || address.city || "";
        const district = address.county || address.state_district || "";
        const state = address.state || "";
        const postcode = address.postcode || "";

        const exactLocation = [village, district, state, postcode].filter(Boolean).join(", ");
        document.getElementById('weatherLocation').innerHTML = `📍 ${exactLocation}`;

        // Get weather
        const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await weather.json();

        const temp = Math.round(data.current_weather.temperature);
        const wind = data.current_weather.windspeed;
        const code = data.current_weather.weathercode;

        document.getElementById('weatherTemp').innerHTML = `${temp}°C`;
        document.getElementById('weatherWind').innerHTML = `${wind} km/h`;
        document.getElementById('weatherFeels').innerHTML = `${temp + 2}°C`;
        document.getElementById('weatherHumidity').innerHTML = '--%';

        const icons = { 0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 51: '🌦️', 61: '🌧️', 95: '⛈️' };
        document.getElementById('weatherIcon').innerHTML = icons[code] || '🌍';

        let risk = 'Medium', riskClass = 'risk-medium', riskText = 'Moderate conditions. Monitor crops.';
        if (code >= 61 || temp > 32) {
          risk = 'High'; riskClass = 'risk-high'; riskText = 'High disease risk! Take preventive measures.';
        } else if (code <= 2 && temp < 25) {
          risk = 'Low'; riskClass = 'risk-low'; riskText = 'Weather conditions are safe for crops.';
        }

        const riskEl = document.getElementById('diseaseRisk');
        riskEl.className = `risk-badge ${riskClass}`;
        riskEl.innerHTML = `⚠️ Disease Risk: ${risk}<br><span style="font-size: 0.65rem;">${riskText}</span>`;

      } catch (e) {
        console.error('Weather fetch error:', e);
        document.getElementById('weatherLocation').innerHTML = '📍 Weather unavailable';
      }
    }, () => {
      document.getElementById('weatherLocation').innerHTML = '📍 Location not available';
    });
  } else {
    document.getElementById('weatherLocation').innerHTML = '📍 Geolocation not supported';
  }
}

function setupEvents() {
  document.getElementById('editProfileBtn')?.addEventListener('click', () => {
    const form = document.getElementById('editForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    document.getElementById('editNameInput').value = document.getElementById('profileName').innerText;
  });

  document.getElementById('cancelProfileBtn')?.addEventListener('click', () => {
    document.getElementById('editForm').style.display = 'none';
  });

  document.getElementById('saveProfileBtn')?.addEventListener('click', async () => {
    const newName = document.getElementById('editNameInput').value.trim();
    if (newName) {
      await fetch(`${window.API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access_token') },
        body: JSON.stringify({ name: newName })
      });
      document.getElementById('profileName').innerText = newName;
      document.getElementById('navUserName').innerText = newName.split(' ')[0];
      document.getElementById('navAvatar').innerText = newName.charAt(0).toUpperCase();

      const avatar = document.getElementById('profileAvatar');
      if (avatar) {
        avatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=4caf50&color=fff&size=128`;
      }
      document.getElementById('editForm').style.display = 'none';
    }
  });

  document.getElementById('uploadAvatarBtn')?.addEventListener('click', () => {
    document.getElementById('avatarInput').click();
  });

  document.getElementById('avatarInput')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = event.target.result;
        document.getElementById('profileAvatar').src = imgUrl;
        const email = document.getElementById('profileEmail')?.innerText;
        if (email) {
          localStorage.setItem(`avatar_${email}`, imgUrl);
        }
        alert('Profile photo updated!');
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('profileLogoutBtn')?.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '/';
  });
}

setTimeout(() => {
  setDefaultAvatar();
}, 500);

console.log('✅ Profile.js loaded with exact location!');