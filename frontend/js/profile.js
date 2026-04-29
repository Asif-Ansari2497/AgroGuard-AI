/**
 * AgroGuard AI — User Profile + Weather
 * Profile modal with user details, stats, and live weather
 * Uses Open-Meteo API (100% free, no API key needed)
 */

const Profile = (() => {

    // ── Weather code → label + emoji ──────────────────────────────────────────
    const WX_CODES = {
        0: { label: 'Clear Sky', icon: '☀️' },
        1: { label: 'Mainly Clear', icon: '🌤️' },
        2: { label: 'Partly Cloudy', icon: '⛅' },
        3: { label: 'Overcast', icon: '☁️' },
        45: { label: 'Foggy', icon: '🌫️' },
        48: { label: 'Icy Fog', icon: '🌫️' },
        51: { label: 'Light Drizzle', icon: '🌦️' },
        53: { label: 'Drizzle', icon: '🌦️' },
        55: { label: 'Heavy Drizzle', icon: '🌧️' },
        61: { label: 'Slight Rain', icon: '🌧️' },
        63: { label: 'Rain', icon: '🌧️' },
        65: { label: 'Heavy Rain', icon: '🌧️' },
        71: { label: 'Light Snow', icon: '🌨️' },
        73: { label: 'Snow', icon: '❄️' },
        75: { label: 'Heavy Snow', icon: '❄️' },
        80: { label: 'Rain Showers', icon: '🌦️' },
        81: { label: 'Heavy Showers', icon: '🌧️' },
        95: { label: 'Thunderstorm', icon: '⛈️' },
        99: { label: 'Thunderstorm+Hail', icon: '⛈️' },
    };

    function wxInfo(code) {
        return WX_CODES[code] || { label: 'Unknown', icon: '🌡️' };
    }

    // ── Geocode city name → lat/lng (Open-Meteo free geocoding) ────────────────
    async function geocodeCity(city) {
        try {
            const name = city.split(',')[0].trim(); // "Ludhiana, Punjab" → "Ludhiana"
            const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=en&format=json`;
            const res = await fetch(url);
            const data = await res.json();
            if (data.results?.length) {
                return {
                    lat: data.results[0].latitude,
                    lng: data.results[0].longitude,
                    name: data.results[0].name + ', ' + (data.results[0].admin1 || ''),
                };
            }
        } catch (e) { console.warn('Geocoding failed:', e); }
        return null;
    }

    // ── Fetch weather from Open-Meteo (free, no API key) ───────────────────────
    async function fetchWeather(lat, lng) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast`
                + `?latitude=${lat}&longitude=${lng}`
                + `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,apparent_temperature`
                + `&timezone=auto`;
            const res = await fetch(url);
            const data = await res.json();
            return data.current || null;
        } catch (e) {
            console.warn('Weather fetch failed:', e);
            return null;
        }
    }

    // ── Get user stats ─────────────────────────────────────────────────────────
    async function fetchUserStats() {
        try {
            const res = await api('GET', '/scans/stats');
            return res;
        } catch (e) { return null; }
    }

    // ── Open Profile Modal ──────────────────────────────────────────────────────
    async function open() {
        const user = getUser();
        if (!user) { notify('Please login first.', 'warning'); return; }

        // Remove existing
        document.getElementById('profileModal')?.remove();

        // Create modal
        const overlay = document.createElement('div');
        overlay.id = 'profileModal';
        overlay.style.cssText = `
      position:fixed;top:0;left:0;right:0;bottom:0;
      background:rgba(5,7,8,0.88);
      z-index:9200;
      display:flex;align-items:center;justify-content:center;
      backdrop-filter:blur(8px);
      padding:1rem;
    `;

        overlay.innerHTML = buildSkeletonHTML(user);
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
        document.body.appendChild(overlay);

        // Load data in parallel
        const [stats, geo] = await Promise.all([
            fetchUserStats(),
            user.location ? geocodeCity(user.location) : Promise.resolve(null),
        ]);

        // Load weather if we got coordinates
        let weather = null;
        if (geo) {
            weather = await fetchWeather(geo.lat, geo.lng);
        } else if (navigator.geolocation) {
            // Try device GPS as fallback
            const pos = await new Promise(r => {
                navigator.geolocation.getCurrentPosition(
                    p => r({ lat: p.coords.latitude, lng: p.coords.longitude }),
                    () => r(null), { timeout: 3000 }
                );
            });
            if (pos) weather = await fetchWeather(pos.lat, pos.lng);
        }

        // Re-render with real data
        const modal = overlay.querySelector('.profile-modal-box');
        if (modal) modal.innerHTML = buildFullHTML(user, stats, weather, geo);

        // Wire up close + edit buttons
        overlay.querySelector('#profileCloseBtn')?.addEventListener('click', () => overlay.remove());
        overlay.querySelector('#profileEditBtn')?.addEventListener('click', () => showEditForm(user, overlay));
        overlay.querySelector('#profileLogoutBtn')?.addEventListener('click', () => {
            clearAuth();
            updateNavbar();
            overlay.remove();
            window.location.href = '/';
        });
    }

    // ── Skeleton while loading ─────────────────────────────────────────────────
    function buildSkeletonHTML(user) {
        return `<div class="profile-modal-box" style="${modalBoxStyle()}">
      <div style="text-align:center;padding:3rem 1rem;color:#8FA899;">
        <div style="font-size:3rem;margin-bottom:1rem;">${getAvatar(user.name)}</div>
        <div style="font-size:1.2rem;font-weight:700;color:#F1F5F2;">${user.name}</div>
        <div style="font-size:0.85rem;margin-top:0.5rem;">Loading your profile...</div>
        <div style="margin-top:1.5rem;width:40px;height:40px;border:3px solid #1E3022;border-top-color:#5A9E2F;border-radius:50%;animation:spin 0.8s linear infinite;margin:1.5rem auto 0;"></div>
      </div>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    </div>`;
    }

    // ── Full profile HTML ──────────────────────────────────────────────────────
    function buildFullHTML(user, stats, weather, geo) {
        const joinDate = user.created_at
            ? new Date(user.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
            : 'Unknown';
        const totalScans = stats?.total_scans ?? 0;
        const mostCommon = stats?.most_common_disease
            ? stats.most_common_disease.replace('Tomato__', '').replace(/_/g, ' ')
            : '—';

        // Gamify state
        let gamify = { level: 1, points: 0, streak: 0, title: 'Seedling' };
        try {
            const g = JSON.parse(localStorage.getItem('agroguard_gamify') || '{}');
            const LEVELS = ['Seedling', 'Sprout', 'Leaf Watcher', 'Field Guard', 'Crop Expert', 'Agri Champion', 'Master Farmer'];
            gamify = {
                level: g.level || 1,
                points: g.points || 0,
                streak: g.streak || 0,
                title: LEVELS[(g.level || 1) - 1] || 'Seedling',
            };
        } catch (e) { }

        return `
    <button id="profileCloseBtn" style="position:absolute;top:1rem;right:1rem;
      background:none;border:none;color:#8FA899;font-size:1.2rem;cursor:pointer;z-index:1;">✕</button>

    <!-- Avatar + Name -->
    <div style="text-align:center;margin-bottom:1.5rem;">
      <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#2D6A4F,#5A9E2F);
        display:flex;align-items:center;justify-content:center;
        font-size:2rem;font-weight:700;color:#fff;margin:0 auto 0.75rem;
        border:3px solid #40916C;box-shadow:0 0 0 6px rgba(90,158,47,0.15);">
        ${user.name.charAt(0).toUpperCase()}
      </div>
      <div style="font-size:1.35rem;font-weight:700;color:#F1F5F2;font-family:Georgia;">${user.name}</div>
      <div style="font-size:0.82rem;color:#8FA899;margin-top:2px;">${user.email}</div>
      <div style="margin-top:0.5rem;">
        <span style="background:rgba(90,158,47,0.15);border:1px solid #40916C;border-radius:20px;
          padding:3px 12px;font-size:0.75rem;font-weight:700;color:#74C69D;">
          Level ${gamify.level} — ${gamify.title}
        </span>
      </div>
    </div>

    <!-- Weather Card -->
    ${buildWeatherCard(weather, geo, user.location)}

    <!-- Info Grid -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;margin-bottom:1rem;">
      ${infoCard('📍', 'Location', user.location || 'Not set')}
      ${infoCard('📅', 'Member Since', joinDate)}
      ${infoCard('🌿', 'Total Scans', totalScans)}
      ${infoCard('🦠', 'Most Detected', mostCommon)}
      ${infoCard('⭐', 'Points Earned', gamify.points)}
      ${infoCard('🔥', 'Day Streak', gamify.streak + ' days')}
    </div>

    <!-- Action Buttons -->
    <div style="display:flex;gap:0.6rem;flex-wrap:wrap;">
      <button id="profileEditBtn" style="${btnStyle('#2D6A4F', '#40916C')}">
        <i class="fa fa-edit"></i> Edit Profile
      </button>
      <a href="/dashboard.html" style="${btnStyle('#1B4332', '#2D6A4F')};text-decoration:none;">
        <i class="fa fa-chart-bar"></i> Dashboard
      </a>
      <button id="profileLogoutBtn" style="${btnStyle('#1a0808', '#dc2626')}">
        <i class="fa fa-sign-out-alt"></i> Logout
      </button>
    </div>
    `;
    }

    // ── Weather card builder ────────────────────────────────────────────────────
    function buildWeatherCard(wx, geo, locationName) {
        if (!wx) {
            return `<div style="background:#0E1510;border:1px solid #1E3022;border-radius:12px;
        padding:1rem;margin-bottom:1rem;text-align:center;font-size:0.8rem;color:#4A5E52;">
        🌡️ Weather data unavailable — add your location in profile to see live weather
      </div>`;
        }

        const temp = Math.round(wx.temperature_2m);
        const feelsLike = Math.round(wx.apparent_temperature);
        const humidity = wx.relative_humidity_2m;
        const wind = Math.round(wx.wind_speed_10m);
        const wx_info = wxInfo(wx.weather_code);
        const city = geo?.name || locationName || 'Your Location';

        // Disease risk from weather
        const blightRisk = (temp >= 10 && temp <= 22 && humidity >= 80)
            ? { level: 'HIGH', color: '#dc2626', tip: 'Cool + humid = Late Blight risk! Spray fungicide.' }
            : (humidity >= 70)
                ? { level: 'MEDIUM', color: '#f59e0b', tip: 'Moderate humidity. Monitor plants carefully.' }
                : { level: 'LOW', color: '#22c55e', tip: 'Weather conditions are relatively safe for crops.' };

        return `
    <div style="background:linear-gradient(135deg,#0E1F14,#0A1A0F);border:1px solid #1E3022;
      border-radius:14px;padding:1rem 1.1rem;margin-bottom:1rem;">

      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.75rem;">
        <div>
          <div style="font-size:0.7rem;font-weight:700;letter-spacing:0.08em;color:#4A5E52;margin-bottom:2px;">
            LIVE WEATHER
          </div>
          <div style="font-size:0.85rem;color:#8FA899;">📍 ${city}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:2.2rem;line-height:1;">${wx_info.icon}</div>
          <div style="font-size:0.72rem;color:#8FA899;margin-top:2px;">${wx_info.label}</div>
        </div>
      </div>

      <!-- Temp + stats row -->
      <div style="display:grid;grid-template-columns:auto 1fr 1fr 1fr;gap:0.75rem;align-items:center;margin-bottom:0.75rem;">
        <div>
          <div style="font-size:2.6rem;font-weight:700;color:#F1F5F2;line-height:1;font-family:Georgia;">
            ${temp}°C
          </div>
          <div style="font-size:0.7rem;color:#8FA899;">Feels ${feelsLike}°C</div>
        </div>
        ${wxStat('💧', 'Humidity', humidity + '%')}
        ${wxStat('💨', 'Wind', wind + ' km/h')}
        ${wxStat('🌡️', 'Condition', wx_info.label.split(' ')[0])}
      </div>

      <!-- Disease risk from weather -->
      <div style="background:rgba(0,0,0,0.3);border-radius:8px;padding:0.6rem 0.75rem;
        border-left:3px solid ${blightRisk.color};">
        <div style="font-size:0.72rem;font-weight:700;color:${blightRisk.color};margin-bottom:2px;">
          🍅 DISEASE RISK FROM WEATHER — ${blightRisk.level}
        </div>
        <div style="font-size:0.76rem;color:#8FA899;">${blightRisk.tip}</div>
      </div>
    </div>`;
    }

    function wxStat(icon, label, val) {
        return `<div style="text-align:center;background:rgba(0,0,0,0.2);border-radius:8px;padding:0.4rem;">
      <div style="font-size:1rem;">${icon}</div>
      <div style="font-size:0.95rem;font-weight:700;color:#F1F5F2;">${val}</div>
      <div style="font-size:0.65rem;color:#4A5E52;">${label}</div>
    </div>`;
    }

    function infoCard(icon, label, val) {
        return `<div style="background:#0E1510;border:1px solid #1E3022;border-radius:10px;padding:0.65rem 0.75rem;">
      <div style="font-size:0.68rem;color:#4A5E52;font-weight:700;letter-spacing:0.06em;margin-bottom:3px;">${icon} ${label.toUpperCase()}</div>
      <div style="font-size:0.9rem;font-weight:600;color:#F1F5F2;">${val}</div>
    </div>`;
    }

    function btnStyle(bg, border) {
        return `background:${bg};border:1px solid ${border};border-radius:8px;
      padding:0.5rem 0.9rem;color:#F1F5F2;font-size:0.82rem;font-weight:600;
      cursor:pointer;display:inline-flex;align-items:center;gap:0.4rem;`;
    }

    function modalBoxStyle() {
        return `background:#050708;border:1px solid #1E3022;border-radius:20px;
      padding:1.75rem;width:100%;max-width:480px;max-height:90vh;overflow-y:auto;
      position:relative;scrollbar-width:thin;scrollbar-color:#1E3022 transparent;`;
    }

    function getAvatar(name) {
        return `<div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,#2D6A4F,#5A9E2F);
      display:inline-flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:#fff;">
      ${(name || 'U').charAt(0).toUpperCase()}</div>`;
    }

    // ── Edit Profile Form ───────────────────────────────────────────────────────
    function showEditForm(user, overlay) {
        const box = overlay.querySelector('.profile-modal-box');
        box.innerHTML = `
      <button onclick="this.closest('.profile-modal-box').innerHTML=''" id="editBackBtn"
        style="background:none;border:none;color:#8FA899;cursor:pointer;font-size:0.85rem;
        display:flex;align-items:center;gap:0.4rem;margin-bottom:1rem;">
        ← Back to Profile
      </button>
      <h3 style="font-family:Georgia;color:#F1F5F2;margin-bottom:1.25rem;">Edit Profile</h3>
      <form id="editProfileForm">
        <div style="margin-bottom:1rem;">
          <label style="font-size:0.78rem;color:#8FA899;display:block;margin-bottom:4px;">Full Name</label>
          <input id="epName" type="text" value="${user.name || ''}"
            style="width:100%;background:#0E1510;border:1px solid #1E3022;border-radius:8px;
            padding:0.6rem 0.75rem;color:#F1F5F2;font-size:0.9rem;box-sizing:border-box;" required/>
        </div>
        <div style="margin-bottom:1rem;">
          <label style="font-size:0.78rem;color:#8FA899;display:block;margin-bottom:4px;">Location</label>
          <input id="epLocation" type="text" value="${user.location || ''}"
            placeholder="e.g. Ludhiana, Punjab"
            style="width:100%;background:#0E1510;border:1px solid #1E3022;border-radius:8px;
            padding:0.6rem 0.75rem;color:#F1F5F2;font-size:0.9rem;box-sizing:border-box;"/>
          <div style="font-size:0.7rem;color:#4A5E52;margin-top:4px;">
            Used for weather and outbreak map
          </div>
        </div>
        <div style="margin-bottom:1.25rem;">
          <label style="font-size:0.78rem;color:#8FA899;display:block;margin-bottom:4px;">Email</label>
          <input type="email" value="${user.email || ''}" disabled
            style="width:100%;background:#080C0A;border:1px solid #1E3022;border-radius:8px;
            padding:0.6rem 0.75rem;color:#4A5E52;font-size:0.9rem;box-sizing:border-box;"/>
          <div style="font-size:0.7rem;color:#4A5E52;margin-top:4px;">Email cannot be changed</div>
        </div>
        <div id="editAlert" style="margin-bottom:0.75rem;font-size:0.82rem;"></div>
        <button type="submit"
          style="width:100%;background:#5A9E2F;border:none;border-radius:8px;padding:0.65rem;
          color:#050708;font-size:0.9rem;font-weight:700;cursor:pointer;"
          id="epSaveBtn">Save Changes</button>
      </form>`;

        // Back button
        box.querySelector('#editBackBtn').addEventListener('click', async () => {
            const [stats, geo] = await Promise.all([
                fetchUserStats(),
                user.location ? geocodeCity(user.location) : Promise.resolve(null),
            ]);
            let weather = null;
            if (geo) weather = await fetchWeather(geo.lat, geo.lng);
            box.innerHTML = buildFullHTML(user, stats, weather, geo);
            box.querySelector('#profileCloseBtn')?.addEventListener('click', () => overlay.remove());
            box.querySelector('#profileEditBtn')?.addEventListener('click', () => showEditForm(user, overlay));
            box.querySelector('#profileLogoutBtn')?.addEventListener('click', () => {
                clearAuth(); updateNavbar(); overlay.remove(); window.location.href = '/';
            });
        });

        // Save
        box.querySelector('#editProfileForm').addEventListener('submit', async e => {
            e.preventDefault();
            const btn = box.querySelector('#epSaveBtn');
            const name = box.querySelector('#epName').value.trim();
            const loc = box.querySelector('#epLocation').value.trim();
            const alrt = box.querySelector('#editAlert');

            btn.disabled = true;
            btn.textContent = 'Saving...';
            alrt.textContent = '';

            try {
                const res = await api('PUT', '/auth/profile', { name, location: loc });
                // Update localStorage
                const u = getUser();
                u.name = name; u.location = loc;
                localStorage.setItem('user', JSON.stringify(u));
                updateNavbar();
                alrt.innerHTML = '<span style="color:#22c55e;">✅ Profile updated!</span>';
                setTimeout(() => { user.name = name; user.location = loc; }, 500);
            } catch (err) {
                alrt.innerHTML = `<span style="color:#dc2626;">❌ ${err.message}</span>`;
            } finally {
                btn.disabled = false;
                btn.textContent = 'Save Changes';
            }
        });
    }

    // ── Wire navbar avatar click ────────────────────────────────────────────────
    function init() {
        // Make nav user chip clickable
        document.getElementById('navUserChip')?.addEventListener('click', open);
        // Style it as clickable
        const chip = document.getElementById('navUserChip');
        if (chip) chip.style.cursor = 'pointer';
        console.log('✅ Profile module ready');
    }

    return { init, open };
})();

document.addEventListener('DOMContentLoaded', () => Profile.init());