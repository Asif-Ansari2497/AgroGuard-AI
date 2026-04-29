import os
from dotenv import load_dotenv
load_dotenv()

APP_NAME = "AgroGuard AI"
APP_VERSION = "1.0.0"
DEBUG = os.getenv("DEBUG", "false").lower() == "true"

# MongoDB
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "agroguard")

# Model
MODEL_PATH = "../models/tomato_mobilenetv2.h5"
IMAGE_SIZE = (224, 224)

# Upload
UPLOAD_DIR = "uploads"
MAX_FILE_SIZE_MB = 10
ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}

# CORS
ALLOWED_ORIGINS = ["*"]

# ─── DISEASE CLASSES ───────────────────────────────────────────────────────────
DISEASE_CLASSES = [
    "Tomato_Early_blight",
    "Tomato_Late_blight",
    "Tomato_healthy",
]

# ─── COMPLETE MULTILINGUAL DISEASE INFO ──────────────────────────────────────
DISEASE_INFO = {
    "Tomato_Early_blight": {
        "severity": "medium",
        "severity_hi": "मध्यम",
        "severity_pa": "ਦਰਮਿਆਨੀ",
        
        "description": "🌿 DISEASE: Tomato Early Blight\n🦠 Caused by: Alternaria solani (fungus)\n⚠️ Risk Level: MEDIUM – treat quickly to avoid spread\n\nWHAT IS EARLY BLIGHT?\nEarly blight is a common fungal disease that attacks tomatoes, potatoes, and other nightshades. It usually appears on older, lower leaves first and slowly moves upward. The fungus survives in plant debris and soil for up to 2 years. It spreads by wind, rain splash, and even on your clothes or tools.\n\n🔍 SYMPTOMS:\n• Dark brown to black spots with concentric rings\n• Yellow halos around each spot\n• Leaves turn yellow, then brown, and drop off\n• Stem cankers on older plants\n\n📈 FAVORABLE CONDITIONS:\n• Warm temperatures: 24-29°C\n• High humidity or frequent rain\n• Leaves staying wet for more than 2 hours\n• Poor air circulation",
        
        "description_hi": "🌿 रोग: टमाटर अर्ली ब्लाइट\n🦠 कारण: अल्टरनेरिया सोलानी (कवक)\n⚠️ जोखिम स्तर: मध्यम – तुरंत इलाज करें\n\nअर्ली ब्लाइट क्या है?\nअर्ली ब्लाइट एक आम फंगल रोग है जो टमाटर, आलू और अन्य नाइटशेड फसलों को नुकसान पहुंचाता है। यह आमतौर पर पुरानी, निचली पत्तियों पर दिखता है और धीरे-धीरे ऊपर की ओर बढ़ता है। यह फंगस पौधों के मलबे और मिट्टी में 2 साल तक जीवित रहता है। यह हवा, बारिश के छींटों और कपड़ों या औजारों से फैलता है।\n\n🔍 लक्षण:\n• गहरे भूरे से काले धब्बे जिन पर गोलाकार छल्ले होते हैं\n• प्रत्येक धब्बे के चारों ओर पीला घेरा\n• पत्तियां पीली होकर भूरी हो जाती हैं और गिर जाती हैं\n\n📈 अनुकूल परिस्थितियां:\n• गर्म तापमान: 24-29°C\n• अधिक नमी या बार-बार बारिश\n• 2 घंटे से अधिक समय तक पत्तियों का गीला रहना\n• हवा का खराब संचार",
        
        "treatment": "🚨 IMMEDIATE ACTIONS:\n\n1️⃣ REMOVE infected leaves - Cut off all leaves with spots\n2️⃣ APPLY FUNGICIDE - Chlorothalonil (2ml per litre) or Mancozeb (2.5g per litre)\n3️⃣ IMPROVE AIRFLOW - Remove lower leaves, stake plants\n4️⃣ CHANGE WATERING HABITS - Water ONLY at the base\n5️⃣ ADD MULCH - Apply 5-10 cm of straw or dried leaves\n\nEXPECTED RECOVERY: 7-10 days",
        
        "treatment_hi": "🚨 तुरंत कार्रवाई:\n\n1️⃣ संक्रमित पत्तियां हटाएं - सभी धब्बेदार पत्तियों को काटें\n2️⃣ फफूंदनाशक लगाएं - क्लोरोथैलोनिल (2ml प्रति लीटर) या मैन्कोज़ेब (2.5g प्रति लीटर)\n3️⃣ हवा का संचार बेहतर करें - निचली पत्तियां हटाएं, पौधों को बांधें\n4️⃣ पानी देने की आदत बदलें - पानी केवल जड़ में दें\n5️⃣ मल्च लगाएं - 5-10 सेमी पुआल या सूखी पत्तियां डालें\n\nरिकवरी: 7-10 दिन",
        
        "prevention": "🛡️ LONG-TERM PREVENTION:\n\n• CROP ROTATION - Never plant tomatoes in same soil for 3 years\n• RESISTANT VARIETIES - Mountain Supreme, Defiant PhR\n• SPACING - Space plants 45-60 cm apart\n• WATER MANAGEMENT - Water early morning only\n• SANITATION - Remove all plant debris after harvest",
        
        "prevention_hi": "🛡️ दीर्घकालिक रोकथाम:\n\n• फसल चक्र - 3 साल तक एक ही जगह टमाटर न लगाएं\n• प्रतिरोधी किस्में - माउंटेन सुप्रीम, डिफायंट PhR\n• दूरी - पौधों के बीच 45-60 सेमी की दूरी रखें\n• पानी प्रबंधन - केवल सुबह के समय पानी दें\n• सफाई - कटाई के बाद सभी पौधों के अवशेष हटा दें"
    },
    
    "Tomato_Late_blight": {
        "severity": "critical",
        "severity_hi": "गंभीर",
        "severity_pa": "ਗੰਭੀਰ",
        
        "description": "☠️ DISEASE: Tomato Late Blight\n🦠 Caused by: Phytophthora infestans (water mould)\n🚨 Risk Level: CRITICAL – EMERGENCY ACTION REQUIRED\n\n⚠️ WARNING: Late blight is the MOST DANGEROUS tomato disease. It can destroy an entire crop in 3-5 days. Same pathogen that caused the Irish Potato Famine.\n\n🔍 SYMPTOMS:\n• Large, water-soaked, greasy spots on leaves\n• White fuzzy mould on leaf undersides\n• Stems develop dark, sunken cankers\n• Fruits have firm, greasy brown patches",
        
        "description_hi": "☠️ रोग: टमाटर लेट ब्लाइट\n🦠 कारण: फाइटोफ्थोरा इन्फेस्टैन्स (जल कवक)\n🚨 जोखिम स्तर: गंभीर – तुरंत कार्रवाई करें\n\n⚠️ चेतावनी: लेट ब्लाइट सबसे खतरनाक टमाटर रोग है। यह 3-5 दिनों में पूरी फसल नष्ट कर सकता है। यह वही रोग है जिसने आयरिश आलू अकाल पैदा किया था।\n\n🔍 लक्षण:\n• पत्तियों पर बड़े, पानी जैसे, चिकने धब्बे\n• पत्तियों के नीचे सफेद फफूंद\n• तनों पर काले, धंसे हुए कैंकर\n• फलों पर सख्त, चिकने भूरे धब्बे",
        
        "treatment": "🚨 EMERGENCY RESPONSE:\n\n1️⃣ STOP overhead watering immediately\n2️⃣ REMOVE and DESTROY infected plants - burn or deep bury\n3️⃣ DISINFECT everything - tools, shoes, hands with bleach\n4️⃣ APPLY SYSTEMIC FUNGICIDE - Metalaxyl + Mancozeb 2.5g per litre\n5️⃣ PROTECT neighbouring fields - inform nearby farmers\n6️⃣ HARVEST surviving fruits early",
        
        "treatment_hi": "🚨 आपातकालीन कार्रवाई:\n\n1️⃣ ऊपर से पानी देना तुरंत बंद करें\n2️⃣ संक्रमित पौधों को हटाएं और नष्ट करें - जलाएं या गहरा गाड़ें\n3️⃣ सब कुछ कीटाणुरहित करें - औजार, जूते, हाथ ब्लीच से साफ करें\n4️⃣ प्रणालीगत फफूंदनाशक लगाएं - मेटालाक्सिल + मैन्कोज़ेब 2.5g प्रति लीटर\n5️⃣ पड़ोसी खेतों की रक्षा करें - आसपास के किसानों को सूचित करें\n6️⃣ स्वस्थ फलों को जल्दी तोड़ें",
        
        "prevention": "🛡️ LONG-TERM PREVENTION:\n\n• RESISTANT VARIETIES - Mountain Magic F1, Defiant PhR, Iron Lady\n• CROP ROTATION - 3-year rotation away from tomatoes, potatoes\n• WATER MANAGEMENT - Drip irrigation only, never overhead\n• SPACING - Space plants 60-90 cm apart\n• CLEANUP - Remove all plant residues after harvest",
        
        "prevention_hi": "🛡️ दीर्घकालिक रोकथाम:\n\n• प्रतिरोधी किस्में - माउंटेन मैजिक F1, डिफायंट PhR, आयरन लेडी\n• फसल चक्र - टमाटर, आलू से 3 साल दूर रहें\n• पानी प्रबंधन - केवल ड्रिप सिंचाई, कभी ऊपर से नहीं\n• दूरी - पौधों के बीच 60-90 सेमी की दूरी\n• सफाई - कटाई के बाद सभी पौधों के अवशेष हटा दें"
    },
    
    "Tomato_healthy": {
        "severity": "none",
        "severity_hi": "कोई नहीं",
        "severity_pa": "ਕੋਈ ਨਹੀਂ",
        
        "description": "✅ PLANT STATUS: Healthy\n😊 No disease detected\n\nYour tomato plant looks great! The AI found no signs of any disease. Keep up the good work.\n\n🔍 WHAT WE CHECKED:\n• Leaf colour: normal green\n• No spots or lesions\n• No fungal growth\n• No insect damage",
        
        "description_hi": "✅ पौधे की स्थिति: स्वस्थ\n😊 कोई रोग नहीं पाया गया\n\nआपका टमाटर का पौधा बहुत अच्छा लग रहा है! एआई को किसी भी रोग के कोई लक्षण नहीं मिले।\n\n🔍 हमने जाँच किया:\n• पत्तियों का रंग: सामान्य हरा\n• कोई धब्बे या घाव नहीं\n• कोई फफूंद वृद्धि नहीं\n• कोई कीट क्षति नहीं",
        
        "treatment": "🌱 NO TREATMENT NEEDED – Your plant is healthy!\n\nROUTINE CARE:\n• Water deeply 2-3 times per week at base only\n• Apply balanced fertilizer every 2 weeks\n• Remove suckers and yellow leaves\n• Monitor for pests weekly",
        
        "treatment_hi": "🌱 किसी उपचार की आवश्यकता नहीं – आपका पौधा स्वस्थ है!\n\nनियमित देखभाल:\n• सप्ताह में 2-3 बार गहरा पानी दें, केवल जड़ में\n• हर 2 सप्ताह में संतुलित खाद डालें\n• सकर्स और पीली पत्तियां हटाएं\n• साप्ताहिक कीट निगरानी करें",
        
        "prevention": "🛡️ BEST PRACTICES TO STAY DISEASE-FREE:\n\n• Regular monitoring every week\n• Water only at base, early morning\n• Crop rotation every 2-3 years\n• Keep field weed-free\n• Use AgroGuard AI regularly",
        
        "prevention_hi": "🛡️ रोग-मुक्त रहने के लिए सर्वोत्तम अभ्यास:\n\n• साप्ताहिक नियमित निगरानी\n• केवल जड़ में, सुबह के समय पानी दें\n• हर 2-3 साल में फसल चक्र अपनाएं\n• खेत को खरपतवार मुक्त रखें\n• एग्रोगार्ड एआई का नियमित उपयोग करें"
    },
}

def get_disease_info(disease_name: str, lang: str = "en") -> dict:
    """Return disease information in requested language"""
    info = DISEASE_INFO.get(disease_name, {})
    
    if lang == "hi":
        return {
            "severity": info.get("severity_hi", info.get("severity", "unknown")),
            "description": info.get("description_hi", info.get("description", "कोई जानकारी उपलब्ध नहीं")),
            "treatment": info.get("treatment_hi", info.get("treatment", "कृपया स्थानीय कृषि विशेषज्ञ से संपर्क करें")),
            "prevention": info.get("prevention_hi", info.get("prevention", "अच्छी खेती के तरीकों का पालन करें"))
        }
    elif lang == "pa":
        return {
            "severity": info.get("severity_pa", info.get("severity", "unknown")),
            "description": info.get("description_pa", info.get("description", "No information available")),
            "treatment": info.get("treatment_pa", info.get("treatment", "Please consult local agronomist")),
            "prevention": info.get("prevention_pa", info.get("prevention", "Practice good farming practices"))
        }
    else:
        return {
            "severity": info.get("severity", "unknown"),
            "description": info.get("description", "No detailed information available"),
            "treatment": info.get("treatment", "Please consult a local agronomist"),
            "prevention": info.get("prevention", "Practice good field hygiene and crop rotation")
        }