/**
 * AgroGuard AI — Voice Assistant v10 (Complete Working - Punjabi Support Added)
 */

let recognition = null;
let isListening = false;
let currentLang = 'en';

// Get current language
function getCurrentLang() {
    const select = document.getElementById('langSelect');
    if (select) currentLang = select.value;
    return currentLang;
}

// Speak text - Fixed for Punjabi (uses Hindi voice as fallback)
function speakText(text) {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Language mapping for TTS
    // Punjabi has NO native voice in browsers, so use Hindi voice as fallback
    if (currentLang === 'pa') {
        utterance.lang = 'hi-IN';  // Hindi voice for Punjabi text
    } else if (currentLang === 'hi') {
        utterance.lang = 'hi-IN';
    } else {
        utterance.lang = 'en-IN';
    }

    utterance.rate = 0.85;
    utterance.pitch = 1;

    utterance.onstart = () => {
        const btn = document.getElementById('voiceBtn');
        if (btn) {
            btn.style.background = '#ff9800';
            btn.innerHTML = '🔊...';
        }
    };

    utterance.onend = () => {
        const btn = document.getElementById('voiceBtn');
        if (btn && !isListening) {
            btn.style.background = '#4caf50';
            btn.innerHTML = '🎤 Speak';
        }
    };

    utterance.onerror = (e) => {
        console.log('Speech error:', e.error);
        const btn = document.getElementById('voiceBtn');
        if (btn && !isListening) {
            btn.style.background = '#4caf50';
            btn.innerHTML = '🎤 Speak';
        }
    };

    window.speechSynthesis.speak(utterance);
}

// Change language
function changeLanguage(lang) {
    const select = document.getElementById('langSelect');
    if (select) {
        select.value = lang;
        currentLang = lang;
        localStorage.setItem('lang', lang);
        select.dispatchEvent(new Event('change'));
        setTimeout(() => location.reload(), 500);
    }
}

// Read full disease info
function readFullInfo() {
    const disease = document.getElementById('resultDisease')?.textContent;
    const severity = document.getElementById('resultSeverity')?.textContent;
    const confidence = document.querySelector('#confidenceRing .confidence-val')?.textContent;
    const description = document.getElementById('tab-description')?.textContent;
    const treatment = document.getElementById('tab-treatment')?.textContent;
    const prevention = document.getElementById('tab-prevention')?.textContent;

    if (disease && disease !== '—') {
        let msg = '';
        if (currentLang === 'hi') {
            msg = `बीमारी: ${disease}. ${severity}. विश्वास: ${confidence}. विवरण: ${description}. उपचार: ${treatment}. रोकथाम: ${prevention}.`;
        } else if (currentLang === 'pa') {
            msg = `ਬਿਮਾਰੀ: ${disease}. ${severity}. ਵਿਸ਼ਵਾਸ: ${confidence}. ਵੇਰਵਾ: ${description}. ਇਲਾਜ: ${treatment}. ਰੋਕਥਾਮ: ${prevention}.`;
        } else {
            msg = `Disease: ${disease}. ${severity}. Confidence: ${confidence}. Description: ${description}. Treatment: ${treatment}. Prevention: ${prevention}.`;
        }
        msg = msg.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        speakText(msg);
    } else {
        const msg = currentLang === 'hi' ? 'अभी कोई रिजल्ट नहीं है। पहले पत्ती स्कैन करें।' :
            (currentLang === 'pa' ? 'ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ। ਪਹਿਲਾਂ ਪੱਤਾ ਸਕੈਨ ਕਰੋ।' : 'No result found. Scan a leaf first.');
        speakText(msg);
    }
}

// Read summary only
function readSummary() {
    const disease = document.getElementById('resultDisease')?.textContent;
    const confidence = document.querySelector('#confidenceRing .confidence-val')?.textContent;

    if (disease && disease !== '—') {
        let msg = '';
        if (currentLang === 'hi') msg = `बीमारी: ${disease}. विश्वास: ${confidence}`;
        else if (currentLang === 'pa') msg = `ਬਿਮਾਰੀ: ${disease}. ਵਿਸ਼ਵਾਸ: ${confidence}`;
        else msg = `Disease: ${disease}. Confidence: ${confidence}`;
        speakText(msg);
    } else {
        const msg = currentLang === 'hi' ? 'कोई रिजल्ट नहीं' : (currentLang === 'pa' ? 'ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ' : 'No result');
        speakText(msg);
    }
}

// Open scan - Opens file upload
function openScan() {
    const msg = currentLang === 'hi' ? 'स्कैनर खोल रहा हूं। पत्ती की फोटो चुनें।' :
        (currentLang === 'pa' ? 'ਸਕੈਨਰ ਖੋਲ੍ਹ ਰਿਹਾ ਹਾਂ। ਪੱਤੇ ਦੀ ਫੋਟੋ ਚੁਣੋ।' :
            'Opening scanner. Select a leaf photo.');
    speakText(msg);

    setTimeout(() => {
        const heroBtn = document.getElementById('heroDetectBtn');
        if (heroBtn) heroBtn.click();
        const imageInput = document.getElementById('imageInput');
        if (imageInput) imageInput.click();
        const uploadPanel = document.getElementById('uploadPanel');
        if (uploadPanel) uploadPanel.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

// Go to page
function goToPage(page) {
    let pageName = '';
    if (currentLang === 'hi') pageName = page === 'dashboard' ? 'डैशबोर्ड' : (page === 'map' ? 'नक्शा' : 'होम');
    else if (currentLang === 'pa') pageName = page === 'dashboard' ? 'ਡੈਸ਼ਬੋਰਡ' : (page === 'map' ? 'ਨਕਸ਼ਾ' : 'ਘਰ');
    else pageName = page;

    const msg = currentLang === 'hi' ? `${pageName} खोल रहा हूं` :
        (currentLang === 'pa' ? `${pageName} ਖੋਲ੍ਹ ਰਿਹਾ ਹਾਂ` : `Opening ${pageName}`);
    speakText(msg);
    setTimeout(() => window.location.href = `/${page}.html`, 600);
}

// Get greeting
function getGreeting() {
    const hour = new Date().getHours();
    if (currentLang === 'hi') return hour < 12 ? 'सुप्रभात' : (hour < 18 ? 'शुभ अपराह्न' : 'शुभ संध्या');
    if (currentLang === 'pa') return 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ';
    return hour < 12 ? 'Good morning' : (hour < 18 ? 'Good afternoon' : 'Good evening');
}

// Show help
function showHelp() {
    let msg = '';
    if (currentLang === 'hi') {
        msg = 'आप ये कह सकते हैं: स्कैन, डैशबोर्ड, मैप, होम, रिजल्ट सुनाओ, पूरा विवरण सुनाओ, हिंदी, पंजाबी, अंग्रेजी, ग्रीटिंग, मदद, या बंद करो।';
    } else if (currentLang === 'pa') {
        msg = 'ਤੁਸੀਂ ਬੋਲ ਸਕਦੇ ਹੋ: ਸਕੈਨ, ਡੈਸ਼ਬੋਰਡ, ਮੈਪ, ਘਰ, ਨਤੀਜਾ ਸੁਣਾਓ, ਪੂਰਾ ਵੇਰਵਾ ਸੁਣਾਓ, ਪੰਜਾਬੀ, ਹਿੰਦੀ, ਅੰਗਰੇਜ਼ੀ, ਗ੍ਰੀਟਿੰਗ, ਮਦਦ, ਜਾਂ ਬੰਦ ਕਰੋ।';
    } else {
        msg = 'You can say: scan, dashboard, map, home, read result, read full details, hindi, punjabi, english, greeting, help, or stop.';
    }
    speakText(msg);
}

// Execute command
function executeCommand(cmd) {
    const c = cmd.toLowerCase();
    console.log('Command:', c);

    // Navigation
    if (c.includes('scan') || c.includes('detect') || c.includes('upload') || c.includes('स्कैन') || c.includes('ਸਕੈਨ')) {
        openScan();
    }
    else if (c.includes('dashboard') || c.includes('डैशबोर्ड') || c.includes('ਡੈਸ਼ਬੋਰਡ')) {
        goToPage('dashboard');
    }
    else if (c.includes('map') || c.includes('मैप') || c.includes('ਨਕਸ਼ਾ') || c.includes('नक्शा')) {
        goToPage('map');
    }
    else if (c.includes('home') || c.includes('होम') || c.includes('ਘਰ')) {
        goToPage('index');
    }
    // Read result
    else if ((c.includes('read') || c.includes('result') || c.includes('बताओ') || c.includes('ਸੁਣਾਓ')) &&
        !c.includes('full') && !c.includes('पूरा') && !c.includes('ਸਾਰਾ')) {
        readSummary();
    }
    else if (c.includes('full') || c.includes('पूरा') || c.includes('ਸਾਰਾ') || c.includes('detail') || c.includes('विस्तार')) {
        readFullInfo();
    }
    // Language change
    else if (c.includes('hindi') || c.includes('हिंदी')) {
        if (currentLang === 'hi') speakText('भाषा पहले से हिंदी है');
        else { speakText('हिंदी में बदल रहा हूं'); changeLanguage('hi'); }
    }
    else if (c.includes('punjabi') || c.includes('पंजाबी') || c.includes('ਪੰਜਾਬੀ')) {
        if (currentLang === 'pa') speakText('ਭਾਸ਼ਾ ਪਹਿਲਾਂ ਹੀ ਪੰਜਾਬੀ ਹੈ');
        else { speakText('ਪੰਜਾਬੀ ਵਿੱਚ ਬਦਲ ਰਿਹਾ ਹਾਂ'); changeLanguage('pa'); }
    }
    else if (c.includes('english') || c.includes('अंग्रेजी') || c.includes('ਅੰਗਰੇਜ਼ੀ')) {
        if (currentLang === 'en') speakText('Language is already English');
        else { speakText('Switching to English'); changeLanguage('en'); }
    }
    // Greeting
    else if (c.includes('greeting') || c.includes('hello') || c.includes('hi') || c.includes('नमस्ते') || c.includes('ਸਤ ਸ੍ਰੀ ਅਕਾਲ')) {
        const greeting = getGreeting();
        let msg = '';
        if (currentLang === 'hi') msg = `${greeting}, मैं एग्रोगार्ड AI हूं।`;
        else if (currentLang === 'pa') msg = `${greeting}, ਮੈਂ ਐਗਰੋਗਾਰਡ AI ਹਾਂ।`;
        else msg = `${greeting}! I am AgroGuard A I.`;
        speakText(msg);
    }
    // Help
    else if (c.includes('help') || c.includes('मदद') || c.includes('ਸਹਾਇਤਾ')) {
        showHelp();
    }
    // Stop
    else if (c.includes('stop') || c.includes('बंद') || c.includes('ਰੁਕੋ') || c.includes('quiet')) {
        window.speechSynthesis.cancel();
        const msg = currentLang === 'hi' ? 'रुक गया' : (currentLang === 'pa' ? 'ਰੁਕ ਗਿਆ' : 'Stopped');
        speakText(msg);
    }
    // Default
    else {
        showHelp();
    }
}

// Start voice recognition
function startVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert('Voice not supported. Please use Chrome browser.');
        return;
    }

    if (recognition) recognition.stop();

    recognition = new SpeechRecognition();

    // Recognition language mapping
    if (currentLang === 'pa') {
        recognition.lang = 'pa-IN';  // Punjabi recognition works in Chrome
    } else if (currentLang === 'hi') {
        recognition.lang = 'hi-IN';
    } else {
        recognition.lang = 'en-IN';
    }

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
        isListening = true;
        const btn = document.getElementById('voiceBtn');
        if (btn) {
            btn.style.background = '#f44336';
            btn.innerHTML = '🎤 Listening...';
        }
    };

    recognition.onend = () => {
        isListening = false;
        const btn = document.getElementById('voiceBtn');
        if (btn) {
            btn.style.background = '#4caf50';
            btn.innerHTML = '🎤 Speak';
        }
    };

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        console.log('You said:', text);
        executeCommand(text);
    };

    recognition.onerror = (event) => {
        console.log('Recognition error:', event.error);
        if (event.error === 'not-allowed') {
            alert('Please allow microphone access.');
        }
        recognition.stop();
    };

    recognition.start();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('voiceBtn');
    if (btn) {
        btn.addEventListener('click', startVoice);
    }

    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.addEventListener('change', () => {
            currentLang = langSelect.value;
        });
        currentLang = langSelect.value;
    }

    console.log('✅ Voice Assistant v10 ready - Punjabi supported');
});