/**
 * AgroGuard AI — Auth UI (FIXED PRODUCTION VERSION)
 */

document.addEventListener('DOMContentLoaded', () => {

    const BASE_URL = "https://agroguard-ai-6xil.onrender.com";

    const overlay = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const regForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tabLogin');
    const tabReg = document.getElementById('tabRegister');
    const modalTitle = document.getElementById('modalTitle');

    // ── Modal Functions ──────────────────────────────────────────────────────────
    function openModal(tab = 'login') {
        if (overlay) overlay.classList.add('open');
        switchTab(tab);
    }

    function closeModal() {
        if (overlay) overlay.classList.remove('open');
    }

    function switchTab(tab) {
        const isLogin = tab === 'login';
        if (loginForm) loginForm.classList.toggle('hidden', !isLogin);
        if (regForm) regForm.classList.toggle('hidden', isLogin);
        if (tabLogin) tabLogin.classList.toggle('active', isLogin);
        if (tabReg) tabReg.classList.toggle('active', !isLogin);
        if (modalTitle) modalTitle.textContent = isLogin ? 'Sign In' : 'Sign Up';
    }

    // ── Auth Helpers ─────────────────────────────────────────────────────────────
    function storeAuth(token, user) {
        localStorage.setItem('access_token', token);
        if (user) localStorage.setItem('user', JSON.stringify(user));

        if (typeof window.setAuth === 'function') {
            window.setAuth(token, user);
        }
    }

    function clearAuth() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');

        if (typeof window.clearAuth === 'function') {
            window.clearAuth();
        }
    }

    // ── UI Events ────────────────────────────────────────────────────────────────
    document.querySelectorAll('[data-open-auth]').forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            openModal(btn.dataset.openAuth || 'login');
        });
    });

    document.querySelectorAll('[data-modal-close]').forEach(el => {
        el.addEventListener('click', closeModal);
    });

    if (overlay) {
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closeModal();
        });
    }

    if (tabLogin) tabLogin.addEventListener('click', () => switchTab('login'));
    if (tabReg) tabReg.addEventListener('click', () => switchTab('register'));

    document.querySelectorAll('[data-switch-tab]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            switchTab(el.dataset.switchTab);
        });
    });

    // ── LOGIN ──────────────────────────────────────────────────────────────────
    if (loginForm) {
        loginForm.addEventListener('submit', async e => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const btn = loginForm.querySelector('[type="submit"]');

            btn.disabled = true;
            btn.textContent = 'Signing in...';

            try {
                const form = new URLSearchParams();
                form.append('username', email);
                form.append('password', password);

                const res = await fetch(`https://agroguard-ai-6xil.onrender.com/auth/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: form
                });

                const data = await res.json().catch(() => ({}));

                if (!res.ok) {
                    throw new Error(data.detail || 'Login failed');
                }

                storeAuth(data.access_token, data.user);
                updateNavbar();
                closeModal();
                notify('Welcome back! 🌿', 'success');

                if (typeof updateHomeAuthState === 'function') {
                    updateHomeAuthState();
                }

            } catch (err) {
                notify(err.message || 'Login failed.', 'error');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Sign In';
            }
        });
    }

    // ── REGISTER ───────────────────────────────────────────────────────────────
    if (regForm) {
        regForm.addEventListener('submit', async e => {
            e.preventDefault();

            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;
            const location = document.getElementById('regLocation')?.value.trim();
            const btn = regForm.querySelector('[type="submit"]');

            btn.disabled = true;
            btn.textContent = 'Creating account...';

            try {
                const res = await fetch(`https://agroguard-ai-6xil.onrender.com/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        location
                    })
                });

                const data = await res.json().catch(() => ({}));

                if (!res.ok) {
                    throw new Error(data.detail || 'Registration failed');
                }

                storeAuth(data.access_token, data.user);
                updateNavbar();
                closeModal();
                notify(`Welcome, ${name}! 🌱`, 'success');

                if (typeof updateHomeAuthState === 'function') {
                    updateHomeAuthState();
                }

            } catch (err) {
                notify(err.message || 'Registration failed.', 'error');
            } finally {
                btn.disabled = false;
                btn.textContent = 'Sign Up';
            }
        });
    }

    // ── LOGOUT ─────────────────────────────────────────────────────────────────
    const logoutBtn = document.getElementById('navLogoutBtn');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            clearAuth();
            updateNavbar();
            notify('Logged out.', 'info');

            if (typeof updateHomeAuthState === 'function') {
                updateHomeAuthState();
            }
        });
    }

    // ── Public API ──────────────────────────────────────────────────────────────
    window.openAuthModal = openModal;
    window.closeAuthModal = closeModal;
    window.switchAuthTab = switchTab;

    console.log('✅ Auth module initialized');
});