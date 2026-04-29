/**
 * AgroGuard AI — Extra Features (Fixed Camera)
 * 1. Camera Direct Scan
 * 2. PDF Report Download
 * 3. WhatsApp Share
 */

// ── Global result store ────────────────
window._lastResult = window._lastResult || null;
window._lastImageDataUrl = window._lastImageDataUrl || null;

// ════════════════════════════════════════════════════════════════════════════
// FEATURE 1 — CAMERA DIRECT SCAN (FIXED)
// ════════════════════════════════════════════════════════════════════════════

let _cameraStream = null;
let _capturedBlob = null;
let _activeScanTab = 'upload';

window.switchScanTab = function (tab) {
  _activeScanTab = tab;

  // Update tab styles
  const tabUpload = document.getElementById('tabUpload');
  const tabCamera = document.getElementById('tabCamera');
  if (tabUpload) tabUpload.classList.toggle('active', tab === 'upload');
  if (tabCamera) tabCamera.classList.toggle('active', tab === 'camera');

  // Show/hide panels
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
      // Fallback to any camera
      _cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
    }

    video.srcObject = _cameraStream;
    video.style.display = 'block';
    captureBtn.disabled = false;

    // Hide preview if showing
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

      // Set canvas dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      // Show preview
      if (preview) preview.src = dataUrl;
      if (wrap) wrap.style.display = 'block';
      if (cameraFeed) cameraFeed.style.display = 'none';

      // Store blob for upload
      canvas.toBlob(blob => {
        _capturedBlob = blob;
        window._lastImageDataUrl = dataUrl;
        window._imgData = dataUrl;
        window._blob = blob;

        // Update button states
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

      // Restart camera stream if needed
      if (_activeScanTab === 'camera' && !_cameraStream) {
        startCamera();
      }
    });
  }

  // Override detect button to use camera capture when in camera mode
  const detectBtn = document.getElementById('detectBtn');
  if (detectBtn) {
    // Remove existing listeners by cloning
    const newDetectBtn = detectBtn.cloneNode(true);
    detectBtn.parentNode.replaceChild(newDetectBtn, detectBtn);

    newDetectBtn.addEventListener('click', async () => {
      // Check login
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

      // Store image for PDF
      window._lastImageDataUrl = imageDataUrl;
      window._imgData = imageDataUrl;

      // Show loading
      const loadingOverlay = document.getElementById('loadingOverlay');
      if (loadingOverlay) loadingOverlay.classList.add('active');
      newDetectBtn.disabled = true;

      try {
        const fd = new FormData();
        fd.append('file', file);

        // Get location if available
        if (window._lat && window._lng) {
          fd.append('latitude', window._lat);
          fd.append('longitude', window._lng);
        }

        const user = typeof getUser !== 'undefined' ? getUser() : null;
        if (user && user.location) fd.append('location_name', user.location);

        const result = await api('POST', '/predict/', fd, true);

        // Store result
        window._lastResult = result;

        // Show result using main app function
        if (typeof showResult === 'function') {
          showResult(result);
        } else {
          // Fallback: manually show result
          const resultSection = document.getElementById('resultSection');
          if (resultSection) resultSection.style.display = 'block';

          const diseaseName = (result.disease_name || result.disease || 'Unknown').replace(/^Tomato_*/, '').replace(/_/g, ' ');
          const resultDisease = document.getElementById('resultDisease');
          if (resultDisease) resultDisease.textContent = diseaseName;

          const confidence = result.confidence || 0;
          const confPercent = Math.round(confidence * 100);
          const confidenceRing = document.getElementById('confidenceRing');
          if (confidenceRing) {
            confidenceRing.innerHTML = `<div class="conf-percent">${confPercent}%</div>`;
          }

          const severity = result.severity || (confidence > 0.8 ? 'high' : confidence > 0.6 ? 'medium' : 'low');
          const severityEl = document.getElementById('resultSeverity');
          if (severityEl) {
            severityEl.className = `severity-badge ${severity === 'high' ? 'sev-high' : severity === 'medium' ? 'sev-medium' : 'sev-low'}`;
            severityEl.textContent = severity.toUpperCase();
          }

          const descTab = document.getElementById('tab-description');
          if (descTab) descTab.textContent = result.description || '';
          const treatTab = document.getElementById('tab-treatment');
          if (treatTab) treatTab.textContent = result.treatment || '';
          const prevTab = document.getElementById('tab-prevention');
          if (prevTab) prevTab.textContent = result.prevention || '';

          const resultActions = document.getElementById('resultActions');
          if (resultActions) resultActions.style.display = 'flex';
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

// Helper to get file for detection
window.getFileForDetection = function () {
  if (_activeScanTab === 'camera' && _capturedBlob) {
    return new File([_capturedBlob], 'camera_capture.jpg', { type: 'image/jpeg' });
  }
  const input = document.getElementById('imageInput');
  return input?.files?.[0] || null;
};

// ════════════════════════════════════════════════════════════════════════════
// FEATURE 2 — PDF REPORT DOWNLOAD
// ════════════════════════════════════════════════════════════════════════════

async function downloadPdfReport() {
  const result = window._lastResult;
  if (!result) {
    if (window.notify) notify('No scan result to download.', 'warning');
    return;
  }

  const btn = document.getElementById('pdfBtn');
  if (!btn) return;
  const originalHtml = btn.innerHTML;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Generating...';
  btn.disabled = true;

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const W = 210;
    const margin = 15;
    let y = margin;

    // Header
    doc.setFillColor(10, 26, 15);
    doc.rect(0, 0, W, 28, 'F');
    doc.setFontSize(18);
    doc.setTextColor(90, 158, 47);
    doc.setFont('helvetica', 'bold');
    doc.text('AgroGuard AI', margin, 12);
    doc.setFontSize(9);
    doc.setTextColor(116, 198, 157);
    doc.setFont('helvetica', 'normal');
    doc.text('AI-Powered Crop Disease Detection Report', margin, 20);

    const now = new Date().toLocaleString();
    doc.setFontSize(8);
    doc.setTextColor(74, 94, 82);
    doc.text(now, W - margin, 12, { align: 'right' });

    y = 36;
    const diseaseName = (result.disease_name || '').replace(/Tomato__*/g, '').replace(/_/g, ' ');
    doc.setFontSize(22);
    doc.setTextColor(26, 26, 26);
    doc.setFont('helvetica', 'bold');
    doc.text(diseaseName, margin, y);
    y += 8;

    const severity = result.severity || 'unknown';
    const sevColor = severity === 'high' ? '#dc2626' : severity === 'medium' ? '#f59e0b' : '#22c55e';
    doc.setFillColor(parseInt(sevColor.slice(1, 3), 16), parseInt(sevColor.slice(3, 5), 16), parseInt(sevColor.slice(5, 7), 16));
    doc.roundedRect(margin, y, 30, 7, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(severity.toUpperCase(), margin + 15, y + 4.8, { align: 'center' });

    const confPct = Math.round((result.confidence || 0) * 100);
    doc.setFontSize(11);
    doc.setTextColor(26, 26, 26);
    doc.text(`Confidence: ${confPct}%`, margin + 36, y + 4.5);
    y += 20;

    // Image
    if (window._lastImageDataUrl) {
      try {
        doc.addImage(window._lastImageDataUrl, 'JPEG', margin, y, 60, 45);
        y += 55;
      } catch (e) { }
    }

    function addSection(title, content) {
      if (y > 240) { doc.addPage(); y = margin; }
      doc.setFillColor(46, 106, 79);
      doc.rect(margin, y, W - margin * 2, 7, 'F');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + 3, y + 5);
      y += 11;

      const clean = (content || '').replace(/<[^>]+>/g, '').replace(/═+|━+/g, '').replace(/\n{3,}/g, '\n\n').trim();
      doc.setFontSize(9);
      doc.setTextColor(51, 51, 51);
      const lines = doc.splitTextToSize(clean, W - margin * 2 - 4);
      for (let line of lines) {
        if (y > 272) { doc.addPage(); y = margin; }
        doc.text(line, margin + 2, y);
        y += 5;
      }
      y += 6;
    }

    addSection('DESCRIPTION', result.description);
    addSection('TREATMENT', result.treatment);
    addSection('PREVENTION', result.prevention);

    doc.save(`AgroGuard_${diseaseName.replace(/\s+/g, '_')}.pdf`);
    if (window.notify) notify('PDF downloaded!', 'success');
  } catch (err) {
    if (window.notify) notify('PDF failed: ' + err.message, 'error');
  } finally {
    btn.innerHTML = originalHtml;
    btn.disabled = false;
  }
}

// ════════════════════════════════════════════════════════════════════════════
// FEATURE 3 — WHATSAPP SHARE
// ════════════════════════════════════════════════════════════════════════════

function shareWhatsApp() {
  const result = window._lastResult;
  if (!result) {
    if (window.notify) notify('No scan result to share.', 'warning');
    return;
  }

  const disease = (result.disease_name || '').replace(/Tomato__*/g, '').replace(/_/g, ' ');
  const conf = Math.round((result.confidence || 0) * 100);
  const severity = (result.severity || '').toUpperCase();
  const user = typeof getUser !== 'undefined' ? getUser() : null;
  const date = new Date().toLocaleDateString();

  const message = `🌿 AgroGuard AI Report\n\n📅 Date: ${date}\n👨‍🌾 Farmer: ${user?.name || 'Guest'}\n📍 Location: ${user?.location || 'India'}\n\n🍅 Disease: ${disease}\n⚠️ Severity: ${severity}\n🎯 Confidence: ${conf}%\n\n🔬 Diagnose. Treat. Save the Harvest.`;

  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

// Wire up buttons
document.addEventListener('DOMContentLoaded', () => {
  const pdfBtn = document.getElementById('pdfBtn');
  if (pdfBtn) pdfBtn.addEventListener('click', downloadPdfReport);

  const waBtn = document.getElementById('waBtn');
  if (waBtn) waBtn.addEventListener('click', shareWhatsApp);
});