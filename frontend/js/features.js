/**
 * AgroGuard AI — Extra Features (Complete Fixed)
 * 1. Camera Direct Scan
 * 2. PDF Report Download (Fixed)
 * 3. WhatsApp Share (Fixed)
 */

// ── Global result store ────────────────
window._lastResult = window._lastResult || null;
window._lastImageDataUrl = window._lastImageDataUrl || null;

// ════════════════════════════════════════════════════════════════════════════
// FEATURE 1 — CAMERA DIRECT SCAN
// ════════════════════════════════════════════════════════════════════════════

let _cameraStream = null;
let _capturedBlob = null;
let _activeScanTab = 'upload';

window.switchScanTab = function (tab) {
  _activeScanTab = tab;

  const tabUpload = document.getElementById('tabUpload');
  const tabCamera = document.getElementById('tabCamera');
  if (tabUpload) tabUpload.classList.toggle('active', tab === 'upload');
  if (tabCamera) tabCamera.classList.toggle('active', tab === 'camera');

  const uploadInner = document.getElementById('uploadInner');
  const cameraPanel = document.getElementById('cameraPanel');
  if (uploadInner) uploadInner.style.display = tab === 'upload' ? 'flex' : 'none';
  if (cameraPanel) cameraPanel.style.display = tab === 'camera' ? 'block' : 'none';

  if (tab === 'camera') {
    startCamera();
  } else {
    stopCamera();
    resetCameraCapture();
  }
};

async function startCamera() {
  const video = document.getElementById('cameraFeed');
  const captureBtn = document.getElementById('captureBtn');
  if (!video || !captureBtn) return;

  stopCamera();
  resetCameraCapture();

  try {
    const constraints = {
      video: {
        facingMode: { exact: 'environment' },
        width: { ideal: 640 },
        height: { ideal: 480 }
      }
    };

    try {
      _cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (err) {
      _cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
    }

    video.srcObject = _cameraStream;
    video.style.display = 'block';
    captureBtn.disabled = false;

    const previewWrap = document.getElementById('capturePreviewWrap');
    if (previewWrap) previewWrap.style.display = 'none';

    if (window.notify) notify('Camera ready! Position leaf and click Capture.', 'success', 3000);
  } catch (err) {
    console.error('Camera error:', err);
    let msg = 'Camera not available. Use Upload Photo tab.';
    if (err.name === 'NotAllowedError') {
      msg = 'Camera permission denied. Please allow camera access.';
    }
    if (window.notify) notify(msg, 'error');
    switchScanTab('upload');
  }
}

function stopCamera() {
  if (_cameraStream) {
    _cameraStream.getTracks().forEach(t => t.stop());
    _cameraStream = null;
  }
  const video = document.getElementById('cameraFeed');
  if (video) {
    video.srcObject = null;
    video.style.display = 'none';
  }
}

function resetCameraCapture() {
  _capturedBlob = null;
  window._lastImageDataUrl = null;

  const previewWrap = document.getElementById('capturePreviewWrap');
  const captureBtn = document.getElementById('captureBtn');
  const retakeBtn = document.getElementById('retakeBtn');
  const detectBtn = document.getElementById('detectBtn');
  const cameraFeed = document.getElementById('cameraFeed');
  const preview = document.getElementById('capturePreview');

  if (previewWrap) previewWrap.style.display = 'none';
  if (captureBtn) {
    captureBtn.innerHTML = '<i class="fa fa-camera"></i> Capture';
    captureBtn.disabled = false;
  }
  if (retakeBtn) retakeBtn.classList.remove('visible');
  if (detectBtn) detectBtn.disabled = true;
  if (cameraFeed) cameraFeed.style.display = 'block';
  if (preview) preview.src = '';
}

// Capture button logic
document.addEventListener('DOMContentLoaded', () => {
  const captureBtn = document.getElementById('captureBtn');
  if (captureBtn) {
    captureBtn.addEventListener('click', () => {
      const video = document.getElementById('cameraFeed');
      const canvas = document.getElementById('canvasHidden');
      const preview = document.getElementById('capturePreview');
      const wrap = document.getElementById('capturePreviewWrap');
      const cameraFeed = document.getElementById('cameraFeed');

      if (!_cameraStream || !video || !video.videoWidth || video.videoWidth === 0) {
        if (window.notify) notify('Camera not ready. Please wait.', 'warning');
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      if (preview) preview.src = dataUrl;
      if (wrap) wrap.style.display = 'block';
      if (cameraFeed) cameraFeed.style.display = 'none';

      canvas.toBlob(blob => {
        _capturedBlob = blob;
        window._lastImageDataUrl = dataUrl;
        window._imgData = dataUrl;
        window._blob = blob;

        if (captureBtn) {
          captureBtn.innerHTML = '<i class="fa fa-check"></i> Captured!';
          captureBtn.disabled = true;
        }

        const retakeBtn = document.getElementById('retakeBtn');
        if (retakeBtn) retakeBtn.classList.add('visible');

        const detectBtn = document.getElementById('detectBtn');
        if (detectBtn) detectBtn.disabled = false;

        if (window.notify) notify('Photo captured! Click "Detect Disease" to analyze.', 'success', 3000);
      }, 'image/jpeg', 0.9);
    });
  }

  // Retake button
  const retakeBtn = document.getElementById('retakeBtn');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      resetCameraCapture();
      const cameraFeed = document.getElementById('cameraFeed');
      if (cameraFeed) cameraFeed.style.display = 'block';

      if (_activeScanTab === 'camera' && !_cameraStream) {
        startCamera();
      }
    });
  }

  // Override detect button to use camera capture when in camera mode
  const detectBtn = document.getElementById('detectBtn');
  if (detectBtn) {
    const newDetectBtn = detectBtn.cloneNode(true);
    detectBtn.parentNode.replaceChild(newDetectBtn, detectBtn);

    newDetectBtn.addEventListener('click', async () => {
      if (typeof isLoggedIn !== 'undefined' && !isLoggedIn()) {
        if (window.openAuthModal) window.openAuthModal('login');
        return;
      }

      let file = null;
      let imageDataUrl = null;

      if (_activeScanTab === 'camera' && _capturedBlob) {
        file = new File([_capturedBlob], 'leaf_capture.jpg', { type: 'image/jpeg' });
        imageDataUrl = window._lastImageDataUrl;
      } else {
        const input = document.getElementById('imageInput');
        if (input && input.files && input.files[0]) {
          file = input.files[0];
          const reader = new FileReader();
          imageDataUrl = await new Promise((resolve) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
          });
        }
      }

      if (!file) {
        if (window.notify) notify('Please capture or select a leaf photo first.', 'error');
        return;
      }

      window._lastImageDataUrl = imageDataUrl;
      window._imgData = imageDataUrl;

      const loadingOverlay = document.getElementById('loadingOverlay');
      if (loadingOverlay) loadingOverlay.classList.add('active');
      newDetectBtn.disabled = true;

      try {
        const fd = new FormData();
        fd.append('file', file);

        if (window._lat && window._lng) {
          fd.append('latitude', window._lat);
          fd.append('longitude', window._lng);
        }

        const user = typeof getUser !== 'undefined' ? getUser() : null;
        if (user && user.location) fd.append('location_name', user.location);

        console.log("API_BASE =", API_BASE);
        console.log("Calling:", `${API_BASE}/predict/`);
        const result = await api('POST', '/predict/', fd, true);

        // ============ CRITICAL FIX ============
        // Store result in BOTH variables
        window._lastResult = result;
        window._result = result;  // ← THIS MAKES PDF/WHATSAPP WORK
        // ====================================

        if (typeof showResult === 'function') {
          showResult(result);
        }

        if (window.notify) notify('Disease detected successfully!', 'success');

      } catch (err) {
        console.error('Detection error:', err);
        if (window.notify) notify(err.message || 'Detection failed', 'error');
      } finally {
        if (loadingOverlay) loadingOverlay.classList.remove('active');
        newDetectBtn.disabled = false;
      }
    });
  }
});

console.log('✅ Features module loaded');