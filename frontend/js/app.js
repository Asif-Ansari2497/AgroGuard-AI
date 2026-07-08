/**
 * AgroGuard AI — Core Utilities
 * API client, i18n system, auth helpers, notifications
 */

// Complete Disease translations for all 3 languages (Detailed Versions)
const diseaseTranslations = {
    en: {
        "Tomato_Early_blight": {
            name: "Early Blight",
            description: "❓ WHAT IS EARLY BLIGHT?\n\nEarly blight is a common fungal disease caused by Alternaria solani. It attacks tomatoes, potatoes, and other nightshade crops.\n\n📌 1. The disease usually appears on older, lower leaves first\n📌 2. Slowly moves upward to younger leaves\n📌 3. Fungus survives in plant debris and soil for up to 2 years\n📌 4. Spreads by wind, rain splash, and contaminated tools/clothes\n\n🔍 SYMPTOMS:\n📌 Dark brown to black spots with concentric rings\n📌 Yellow halos surrounding each spot\n📌 Leaves turn yellow → brown → drop off\n📌 Stem cankers on older plants\n📌 Fruits may develop dark, sunken spots near stem\n\n🌡️ FAVORABLE CONDITIONS:\n📌 Warm temperatures: 24-29°C\n📌 High humidity or frequent rain\n📌 Leaves staying wet for more than 2 hours\n📌 Poor air circulation due to crowded plants",
            treatment: "⚡ IMMEDIATE ACTIONS:\n\n✅ 1. REMOVE infected leaves - Cut off all leaves with spots\n✅ 2. Use clean, sharp scissors or pruners\n✅ 3. Dip tools in 70% alcohol or 10% bleach between cuts\n✅ 4. Bag removed leaves in plastic - do NOT compost\n✅ 5. Burn or throw in trash far from garden\n\n🧪 APPLY FUNGICIDE:\n✅ Chlorothalonil - 2 ml per litre water\n✅ Mancozeb 75% WP - 2.5 g per litre water\n✅ Copper oxychloride - 3 g per litre water\n\n🌿 Organic options:\n✅ Neem oil - 5 ml per litre + few drops soap\n✅ Baking soda spray - 1 tbsp + 1 tbsp oil + 1 tsp soap in 1 gallon water\n\n📝 Application tips:\n✅ Spray in early morning or late evening\n✅ Cover ALL leaf surfaces - tops AND bottoms\n✅ Repeat every 7 days while disease is active\n✅ Stop spraying at least 7 days before harvest\n\n💨 IMPROVE AIRFLOW:\n✅ Remove lower leaves up to 30 cm from ground\n✅ Prune suckers and dense branches\n✅ Stake plants to keep them upright\n\n💧 WATERING HABITS:\n✅ Water ONLY at the base - never overhead\n✅ Water in the morning\n✅ Use drip irrigation if possible\n\n📅 EXPECTED RECOVERY: 7-10 days",
            prevention: "🛡️ LONG-TERM PREVENTION:\n\n🌾 CROP ROTATION:\n✅ Never plant tomatoes in same soil for 3 years\n✅ Rotate with maize, beans, onions, or wheat\n\n🌱 RESISTANT VARIETIES:\n✅ Mountain Supreme, Defiant PhR, Jasper, Juliet\n✅ Ask your local seed supplier\n\n🌿 HEALTHY START:\n✅ Use certified disease‑free seeds\n✅ Soak saved seeds in hot water (50°C) for 25 minutes\n\n📏 SPACING & PRUNING:\n✅ Space plants 45-60 cm apart\n✅ Remove lower leaves touching soil\n✅ Prune regularly\n\n💧 WATER MANAGEMENT:\n✅ Water early morning only\n✅ Avoid wetting foliage\n✅ Ensure good drainage\n\n🧹 SANITATION:\n✅ Remove all plant debris after harvest\n✅ Disinfect tools with bleach solution\n✅ Keep garden weed‑free\n\n📱 MONITORING:\n✅ Walk through field every 3 days\n✅ Check lower leaves first\n✅ Use AgroGuard AI regularly",
            severity: "Medium"
        },
        "Tomato_Late_blight": {
            name: "Late Blight",
            description: "⚠️ WARNING: Late blight is the MOST DANGEROUS tomato disease!\n\n❓ WHAT IS LATE BLIGHT?\n📌 Caused by: Phytophthora infestans (water mould)\n📌 Can destroy an entire crop in 3-5 days\n📌 Same pathogen that caused the Irish Potato Famine\n📌 No cure once plant is fully infected\n\n🔍 SYMPTOMS:\n📌 Large, water‑soaked, greasy spots on leaves\n📌 White fuzzy mould on leaf undersides\n📌 Stems develop dark, sunken cankers\n📌 Fruits have firm, greasy brown patches\n📌 Entire plant collapses within a week\n\n🌡️ FAVORABLE CONDITIONS:\n📌 Cool temperatures: 10-20°C\n📌 Humidity above 90% for several days\n📌 Fog, drizzle, or prolonged leaf wetness\n📌 Planting near potatoes\n\n⚠️ ACT WITHIN HOURS, NOT DAYS!",
            treatment: "🚨 EMERGENCY RESPONSE:\n\n✅ 1. STOP overhead watering immediately\n✅ 2. Water only at base if absolutely necessary\n✅ 3. Do not enter field with wet clothes\n\n✅ 4. REMOVE infected plants\n✅ 5. Cut at base, place in thick plastic bag\n✅ 6. Seal bag and burn or dispose in trash - NEVER compost\n\n✅ 7. DISINFECT everything\n✅ 8. Tools: dip in 10% bleach for 30 seconds\n✅ 9. Shoes: spray with bleach solution\n✅ 10. Hands: wash with soap and water\n\n🧪 APPLY SYSTEMIC FUNGICIDE:\n✅ Metalaxyl + Mancozeb (Ridomil Gold) - 2.5 g/L\n✅ Cymoxanil + Mancozeb (Curzate) - 2.5 g/L\n✅ Fosetyl‑Al (Aliette) - 3 g/L\n✅ Spray ALL remaining plants\n✅ Cover top and bottom of every leaf\n✅ Repeat every 3-4 days\n\n✅ 11. PROTECT neighbouring fields\n✅ 12. Inform nearby farmers immediately\n\n🍅 HARVEST surviving fruits early\n✅ Pick mature green fruits - ripen indoors\n✅ Wash with water + few drops of bleach\n\n📅 EXPECTED: May save 50-70% of plants",
            prevention: "🛡️ LONG-TERM PREVENTION:\n\n🌱 RESISTANT VARIETIES:\n✅ Mountain Magic F1, Defiant PhR, Iron Lady, Plum Regal\n✅ Ask for 'late blight resistant' seeds\n\n🌾 CROP ROTATION:\n✅ 3‑year rotation away from tomatoes, potatoes, peppers\n✅ Avoid planting near potato fields\n✅ Choose open, sunny location\n\n🚫 ELIMINATE VOLUNTEER PLANTS:\n✅ Remove any wild tomato or potato plants\n\n💧 WATER MANAGEMENT:\n✅ Use drip irrigation - never overhead\n✅ Water early morning only\n✅ Avoid low, wet areas\n\n📏 SPACING & PRUNING:\n✅ Space plants 60-90 cm apart\n✅ Prune lower leaves and suckers\n✅ Stake plants\n\n🧪 PREVENTIVE SPRAYS:\n✅ Start when plants are 30 cm tall\n✅ Dry weather: spray copper every 10-14 days\n✅ Wet weather: spray every 5-7 days\n✅ After heavy rain: spray within 24 hours\n\n🧹 POST‑HARVEST CLEANUP:\n✅ Remove ALL plant residues\n✅ Burn or deep bury\n\n📱 SCAN every week with AgroGuard AI",
            severity: "Critical"
        },
        "Tomato_healthy": {
            name: "Healthy",
            description: "✅ PLANT STATUS: Healthy\n😊 No disease detected\n\nYour tomato plant looks great! The AI found no signs of disease.\n\n🔍 WHAT WE CHECKED:\n📌 Leaf colour: normal green\n📌 No spots or lesions\n📌 No fungal growth\n📌 No insect damage\n\n🌿 Keep up the good work! Follow prevention schedule below.",
            treatment: "🌱 NO TREATMENT NEEDED\n\n📅 ROUTINE CARE:\n\n💧 WATERING:\n✅ Water deeply 2-3 times per week\n✅ Always water at base\n✅ Best time: early morning (6-9 AM)\n\n🌿 FERTILIZATION:\n✅ Every 2 weeks: balanced NPK (10-10-10)\n✅ When flowering: low‑N, high‑P (5-10-10)\n✅ When fruiting: high‑K (5-10-15)\n\n✂️ PRUNING:\n✅ Remove suckers\n✅ Remove yellow or dead leaves\n✅ Keep 1-2 main stems\n\n🐞 PEST MONITORING:\n✅ Check leaf undersides weekly\n✅ Look for hornworms - pick off by hand\n✅ Install yellow sticky traps\n\n📱 SCAN every 1-2 weeks",
            prevention: "🛡️ STAY DISEASE‑FREE:\n\n🌿 SOIL PREPARATION:\n✅ Test soil pH - ideal 6.0-6.8\n✅ Add compost before planting\n✅ Ensure good drainage\n\n🌱 PLANTING:\n✅ Buy certified disease‑free seeds\n✅ Space plants 45-60 cm apart\n✅ Plant deep - bury 2/3 of stem\n\n🍂 MULCHING:\n✅ Apply 5-10 cm of straw or dried leaves\n✅ Prevents soil splash\n\n💧 WATERING RULES:\n✅ Water only at base, early morning\n✅ Use drip irrigation if possible\n✅ Avoid waterlogging\n\n🔄 CROP ROTATION:\n✅ Never plant tomatoes in same spot for 3 years\n✅ Rotate with beans, corn, onions\n\n🧹 SANITATION:\n✅ Remove all plant debris after harvest\n✅ Clean tools with bleach\n✅ Keep garden weed‑free\n\n📱 USE AGROGUARD AI regularly",
            severity: "None"
        }
    },
    hi: {
        "Tomato_Early_blight": {
            name: "अर्ली ब्लाइट",
            description: "❓ अर्ली ब्लाइट क्या है?\n\nअर्ली ब्लाइट एक आम फंगल रोग है जो अल्टरनेरिया सोलानी के कारण होता है।\n\n📌 1. यह रोग आमतौर पर पुरानी, निचली पत्तियों पर दिखता है\n📌 2. धीरे-धीरे ऊपर की ओर बढ़ता है\n📌 3. फंगस पौधों के मलबे और मिट्टी में 2 साल तक जीवित रहता है\n📌 4. हवा, बारिश और औजारों से फैलता है\n\n🔍 लक्षण:\n📌 गहरे भूरे से काले धब्बे जिन पर गोलाकार छल्ले होते हैं\n📌 प्रत्येक धब्बे के चारों ओर पीला घेरा\n📌 पत्तियां पीली होकर भूरी हो जाती हैं और गिर जाती हैं\n📌 पुराने पौधों पर तने के कैंकर\n📌 फलों पर तने के पास गहरे, धंसे हुए धब्बे\n\n🌡️ अनुकूल परिस्थितियां:\n📌 गर्म तापमान: 24-29°C\n📌 अधिक नमी या बार-बार बारिश\n📌 2 घंटे से अधिक समय तक पत्तियों का गीला रहना\n📌 खराब हवा का संचार",
            treatment: "⚡ तुरंत कार्रवाई:\n\n✅ 1. संक्रमित पत्तियां हटाएं - सभी धब्बेदार पत्तियों को काटें\n✅ 2. साफ, तेज कैंची या प्रूनर का उपयोग करें\n✅ 3. औजारों को 70% अल्कोहल या 10% ब्लीच में डुबोएं\n✅ 4. हटाई गई पत्तियों को प्लास्टिक बैग में डालें - खाद में न डालें\n✅ 5. जलाएं या कूड़ेदान में फेंकें\n\n🧪 फफूंदनाशक लगाएं:\n✅ क्लोरोथैलोनिल - 2ml प्रति लीटर पानी\n✅ मैन्कोज़ेब 75% WP - 2.5g प्रति लीटर पानी\n✅ कॉपर ऑक्सीक्लोराइड - 3g प्रति लीटर पानी\n\n🌿 जैविक विकल्प:\n✅ नीम का तेल - 5ml प्रति लीटर + साबुन की कुछ बूंदें\n✅ बेकिंग सोडा स्प्रे - 1 बड़ा चम्मच + 1 बड़ा चम्मच तेल + 1 छोटा चम्मच साबुन\n\n📝 स्प्रे करने के टिप्स:\n✅ सुबह या शाम को स्प्रे करें (दोपहर में कभी नहीं)\n✅ सभी पत्तियों को ढकें - ऊपर और नीचे दोनों तरफ\n✅ बीमारी सक्रिय रहने पर हर 7 दिन में दोहराएं\n✅ कटाई से कम से कम 7 दिन पहले स्प्रे बंद करें\n\n💨 हवा का संचार बेहतर करें:\n✅ जमीन से 30 सेमी तक निचली पत्तियां हटाएं\n✅ घनी शाखाओं को काटें\n✅ पौधों को बांधें\n\n💧 पानी देने की आदतें:\n✅ पानी केवल जड़ में दें - कभी ऊपर से नहीं\n✅ सुबह के समय पानी दें\n✅ ड्रिप सिंचाई का उपयोग करें\n\n📅 रिकवरी: 7-10 दिन",
            prevention: "🛡️ दीर्घकालिक रोकथाम:\n\n🌾 फसल चक्र:\n✅ 3 साल तक एक ही जगह टमाटर न लगाएं\n✅ मक्का, सेम, प्याज या गेहूं के साथ बदलें\n\n🌱 प्रतिरोधी किस्में:\n✅ माउंटेन सुप्रीम, डिफायंट PhR, जैस्पर, जूलियट\n✅ अपने स्थानीय बीज विक्रेता से पूछें\n\n🌿 स्वस्थ शुरुआत:\n✅ प्रमाणित रोग-मुक्त बीजों का उपयोग करें\n✅ बचाए गए बीजों को गर्म पानी (50°C) में 25 मिनट भिगोएं\n\n📏 दूरी और छंटाई:\n✅ पौधों के बीच 45-60 सेमी की दूरी रखें\n✅ जमीन को छूने वाली निचली पत्तियों को हटाएं\n✅ नियमित रूप से छंटाई करें\n\n💧 पानी प्रबंधन:\n✅ केवल सुबह के समय पानी दें\n✅ पत्तियों को गीला करने से बचें\n✅ अच्छी जल निकासी सुनिश्चित करें\n\n🧹 सफाई:\n✅ कटाई के बाद सभी पौधों के अवशेष हटा दें\n✅ ब्लीच के घोल से औजारों को कीटाणुरहित करें\n✅ बगीचे को खरपतवार मुक्त रखें\n\n📱 निगरानी:\n✅ हर 3 दिन में खेत में घूमें\n✅ पहले निचली पत्तियों की जांच करें\n✅ एग्रोगार्ड एआई का नियमित उपयोग करें",
            severity: "मध्यम"
        },
        "Tomato_Late_blight": {
            name: "लेट ब्लाइट",
            description: "⚠️ चेतावनी: लेट ब्लाइट सबसे खतरनाक टमाटर रोग है!\n\n❓ लेट ब्लाइट क्या है?\n📌 कारण: फाइटोफ्थोरा इन्फेस्टैन्स (जल कवक)\n📌 3-5 दिनों में पूरी फसल नष्ट कर सकता है\n📌 यह वही रोग है जिसने आयरिश आलू अकाल पैदा किया था\n📌 एक बार पौधा पूरी तरह संक्रमित हो जाए तो कोई इलाज नहीं\n\n🔍 लक्षण:\n📌 पत्तियों पर बड़े, पानी जैसे, चिकने धब्बे\n📌 पत्तियों के नीचे सफेद फफूंद\n📌 तनों पर काले, धंसे हुए कैंकर\n📌 फलों पर सख्त, चिकने भूरे धब्बे\n📌 एक सप्ताह के भीतर पूरा पौधा गिर जाता है\n\n🌡️ अनुकूल परिस्थितियां:\n📌 ठंडा तापमान: 10-20°C\n📌 कई दिनों तक 90% से अधिक आर्द्रता\n📌 कोहरा, बूंदाबांदी, या लंबे समय तक पत्तियों का गीला रहना\n📌 आलू के खेतों के पास रोपण\n\n⚠️ घंटों के भीतर कार्रवाई करें, दिनों में नहीं!",
            treatment: "🚨 आपातकालीन कार्रवाई:\n\n✅ 1. ऊपर से पानी देना तुरंत बंद करें\n✅ 2. केवल जड़ में ही पानी दें\n✅ 3. गीले कपड़ों के साथ खेत में प्रवेश न करें\n\n✅ 4. संक्रमित पौधों को हटाएं\n✅ 5. आधार से काटें, मोटे प्लास्टिक बैग में डालें\n✅ 6. बैग सील करें और जलाएं या कूड़ेदान में फेंकें - कभी खाद में न डालें\n\n✅ 7. सब कुछ कीटाणुरहित करें\n✅ 8. औजार: 30 सेकंड के लिए 10% ब्लीच में डुबोएं\n✅ 9. जूते: ब्लीच के घोल से स्प्रे करें\n✅ 10. हाथ: साबुन और पानी से धोएं\n\n🧪 प्रणालीगत फफूंदनाशक लगाएं:\n✅ मेटालाक्सिल + मैन्कोज़ेब (रिडोमिल गोल्ड) - 2.5g/L\n✅ साइमोक्सानिल + मैन्कोज़ेब (क्यूरेट) - 2.5g/L\n✅ फोसेटाइल-अल (एलिएट) - 3g/L\n✅ सभी बचे हुए पौधों पर स्प्रे करें\n✅ हर पत्ते के ऊपर और नीचे कवर करें\n✅ हर 3-4 दिन में दोहराएं\n\n✅ 11. पड़ोसी खेतों की रक्षा करें\n✅ 12. आसपास के किसानों को तुरंत सूचित करें\n\n🍅 बचे हुए फलों को जल्दी तोड़ें:\n✅ पके हरे फल तोड़ें - घर के अंदर पकाएं\n✅ पानी + ब्लीच की कुछ बूंदों से धोएं\n\n📅 परिणाम: 50-70% पौधे बच सकते हैं",
            prevention: "🛡️ दीर्घकालिक रोकथाम:\n\n🌱 प्रतिरोधी किस्में:\n✅ माउंटेन मैजिक F1, डिफायंट PhR, आयरन लेडी, प्लम रीगल\n✅ 'लेट ब्लाइट प्रतिरोधी' बीज मांगें\n\n🌾 फसल चक्र:\n✅ टमाटर, आलू, मिर्च, बैंगन से 3 साल दूर रहें\n✅ आलू के खेतों के पास रोपण से बचें\n✅ खुला, धूप वाला स्थान चुनें\n\n🚫 स्वयं उगे पौधों को हटाएं:\n✅ कोई भी जंगली टमाटर या आलू के पौधे हटा दें\n\n💧 पानी प्रबंधन:\n✅ ड्रिप सिंचाई का उपयोग करें - कभी ऊपर से नहीं\n✅ केवल सुबह के समय पानी दें\n✅ निचले, गीले क्षेत्रों में रोपण से बचें\n\n📏 दूरी और छंटाई:\n✅ पौधों के बीच 60-90 सेमी की दूरी रखें\n✅ निचली पत्तियों और सकर्स को काटें\n✅ पौधों को बांधें\n\n🧪 निवारक स्प्रे:\n✅ जब पौधे 30 सेमी लंबे हों तो शुरू करें\n✅ सूखे मौसम में: हर 10-14 दिन में कॉपर स्प्रे करें\n✅ गीले, कोहरे वाले मौसम में: हर 5-7 दिन में स्प्रे करें\n✅ भारी बारिश के बाद: 24 घंटे के भीतर स्प्रे करें\n\n🧹 कटाई के बाद सफाई:\n✅ सभी पौधों के अवशेष हटा दें\n✅ जलाएं या गहरा गाड़ें\n\n📱 एग्रोगार्ड एआई का नियमित उपयोग करें",
            severity: "गंभीर"
        },
        "Tomato_healthy": {
            name: "स्वस्थ",
            description: "✅ पौधे की स्थिति: स्वस्थ\n😊 कोई रोग नहीं पाया गया\n\nआपका टमाटर का पौधा बहुत अच्छा लग रहा है! एआई को कोई रोग के लक्षण नहीं मिले।\n\n🔍 हमने जाँच किया:\n📌 पत्तियों का रंग: सामान्य हरा\n📌 कोई धब्बे या घाव नहीं\n📌 कोई फफूंद वृद्धि नहीं\n📌 कोई कीट क्षति नहीं\n\n🌿 अच्छा काम करते रहें! नीचे रोकथाम अनुसूची का पालन करें।",
            treatment: "🌱 किसी उपचार की आवश्यकता नहीं\n\n📅 नियमित देखभाल:\n\n💧 पानी:\n✅ सप्ताह में 2-3 बार गहरा पानी दें\n✅ हमेशा जड़ में पानी दें\n✅ सबसे अच्छा समय: सुबह (6-9 बजे)\n\n🌿 उर्वरक:\n✅ हर 2 सप्ताह में: संतुलित NPK (10-10-10)\n✅ फूल आने पर: कम-N, उच्च-P (5-10-10)\n✅ फल लगने पर: उच्च-K (5-10-15)\n\n✂️ छंटाई:\n✅ सकर्स हटाएं\n✅ पीली या मरी हुई पत्तियां हटाएं\n✅ 1-2 मुख्य तने रखें\n\n🐞 कीट निगरानी:\n✅ साप्ताहिक पत्तियों के नीचे जांच करें\n✅ हॉर्नवर्म देखें - हाथ से हटाएं\n✅ पीले चिपचिपे जाल लगाएं\n\n📱 हर 1-2 सप्ताह में स्कैन करें",
            prevention: "🛡️ रोग-मुक्त रहने के लिए:\n\n🌿 मिट्टी की तैयारी:\n✅ मिट्टी का पीएच जांचें - आदर्श 6.0-6.8\n✅ रोपण से पहले खाद डालें\n✅ अच्छी जल निकासी सुनिश्चित करें\n\n🌱 रोपण:\n✅ प्रमाणित रोग-मुक्त बीज खरीदें\n✅ पौधों के बीच 45-60 सेमी की दूरी रखें\n✅ गहरा रोपण करें - तने का 2/3 भाग गाड़ें\n\n🍂 मल्चिंग:\n✅ 5-10 सेमी पुआल या सूखी पत्तियां डालें\n✅ मिट्टी के छींटे रोकता है\n\n💧 पानी के नियम:\n✅ केवल जड़ में, सुबह के समय पानी दें\n✅ ड्रिप सिंचाई का उपयोग करें\n✅ जलभराव से बचें\n\n🔄 फसल चक्र:\n✅ 3 साल तक एक ही जगह टमाटर न लगाएं\n✅ सेम, मक्का, प्याज के साथ बदलें\n\n🧹 सफाई:\n✅ कटाई के बाद सभी पौधों के अवशेष हटा दें\n✅ ब्लीच से औजार साफ करें\n✅ बगीचे को निराई रखें\n\n📱 एग्रोगार्ड एआई का नियमित उपयोग करें",
            severity: "कोई नहीं"
        }
    },
    pa: {
        "Tomato_Early_blight": {
            name: "ਅਰਲੀ ਬਲਾਈਟ",
            description: "❓ ਅਰਲੀ ਬਲਾਈਟ ਕੀ ਹੈ?\n\nਅਰਲੀ ਬਲਾਈਟ ਇੱਕ ਆਮ ਫੰਗਲ ਰੋਗ ਹੈ ਜੋ ਅਲਟਰਨੇਰੀਆ ਸੋਲਾਨੀ ਕਾਰਨ ਹੁੰਦਾ ਹੈ।\n\n📌 1. ਇਹ ਰੋਗ ਆਮ ਤੌਰ 'ਤੇ ਪੁਰਾਣੇ, ਹੇਠਲੇ ਪੱਤਿਆਂ 'ਤੇ ਦਿਖਾਈ ਦਿੰਦਾ ਹੈ\n📌 2. ਹੌਲੀ-ਹੌਲੀ ਉੱਪਰ ਵੱਲ ਵਧਦਾ ਹੈ\n📌 3. ਫੰਗਸ ਪੌਦਿਆਂ ਦੇ ਮਲਬੇ ਅਤੇ ਮਿੱਟੀ ਵਿੱਚ 2 ਸਾਲ ਤੱਕ ਜਿਉਂਦਾ ਰਹਿੰਦਾ ਹੈ\n📌 4. ਹਵਾ, ਬਾਰਿਸ਼ ਅਤੇ ਔਜ਼ਾਰਾਂ ਨਾਲ ਫੈਲਦਾ ਹੈ\n\n🔍 ਲੱਛਣ:\n📌 ਗੂੜ੍ਹੇ ਭੂਰੇ ਤੋਂ ਕਾਲੇ ਧੱਬੇ\n📌 ਹਰੇਕ ਧੱਬੇ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਪੀਲਾ ਘੇਰਾ\n📌 ਪੱਤੇ ਪੀਲੇ ਹੋ ਕੇ ਭੂਰੇ ਹੋ ਜਾਂਦੇ ਹਨ ਅਤੇ ਡਿੱਗ ਜਾਂਦੇ ਹਨ\n📌 ਪੁਰਾਣੇ ਪੌਦਿਆਂ 'ਤੇ ਤਣੇ ਦੇ ਕੈਂਕਰ\n📌 ਫਲਾਂ 'ਤੇ ਤਣੇ ਦੇ ਨੇੜੇ ਗੂੜ੍ਹੇ, ਧਸੇ ਹੋਏ ਧੱਬੇ\n\n🌡️ ਅਨੁਕੂਲ ਸਥਿਤੀਆਂ:\n📌 ਗਰਮ ਤਾਪਮਾਨ: 24-29°C\n📌 ਉੱਚ ਨਮੀ ਜਾਂ ਵਾਰ-ਵਾਰ ਬਾਰਿਸ਼\n📌 2 ਘੰਟੇ ਤੋਂ ਵੱਧ ਸਮੇਂ ਤੱਕ ਪੱਤਿਆਂ ਦਾ ਗਿੱਲਾ ਰਹਿਣਾ\n📌 ਹਵਾ ਦਾ ਖਰਾਬ ਸੰਚਾਰ",
            treatment: "⚡ ਤੁਰੰਤ ਕਾਰਵਾਈ:\n\n✅ 1. ਸੰਕਰਮਿਤ ਪੱਤੇ ਹਟਾਓ - ਸਾਰੇ ਧੱਬੇਦਾਰ ਪੱਤੇ ਕੱਟੋ\n✅ 2. ਸਾਫ਼, ਤਿੱਖੀ ਕੈਂਚੀ ਦੀ ਵਰਤੋਂ ਕਰੋ\n✅ 3. ਔਜ਼ਾਰਾਂ ਨੂੰ 70% ਅਲਕੋਹਲ ਜਾਂ 10% ਬਲੀਚ ਵਿੱਚ ਡੁਬੋਓ\n✅ 4. ਹਟਾਏ ਪੱਤੇ ਪਲਾਸਟਿਕ ਬੈਗ ਵਿੱਚ ਪਾਓ - ਖਾਦ ਵਿੱਚ ਨਾ ਪਾਓ\n✅ 5. ਸਾੜੋ ਜਾਂ ਕੂੜੇ ਵਿੱਚ ਸੁੱਟੋ\n\n🧪 ਫੰਜਾਈਸਾਈਡ ਲਗਾਓ:\n✅ ਕਲੋਰੋਥੈਲੋਨਿਲ - 2ml ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ\n✅ ਮੈਨਕੋਜ਼ੇਬ 75% WP - 2.5g ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ\n✅ ਕਾਪਰ ਆਕਸੀਕਲੋਰਾਈਡ - 3g ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ\n\n🌿 ਜੈਵਿਕ ਵਿਕਲਪ:\n✅ ਨਿੰਮ ਦਾ ਤੇਲ - 5ml ਪ੍ਰਤੀ ਲੀਟਰ + ਸਾਬਣ ਦੀਆਂ ਕੁਝ ਬੂੰਦਾਂ\n\n📝 ਸਪਰੇ ਕਰਨ ਦੇ ਸੁਝਾਅ:\n✅ ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਸਪਰੇ ਕਰੋ\n✅ ਸਾਰੇ ਪੱਤਿਆਂ ਨੂੰ ਢੱਕੋ - ਉੱਪਰ ਅਤੇ ਹੇਠਾਂ\n✅ ਬੀਮਾਰੀ ਸਰਗਰਮ ਰਹਿਣ 'ਤੇ ਹਰ 7 ਦਿਨਾਂ ਬਾਅਦ ਦੁਹਰਾਓ\n\n💨 ਹਵਾ ਦਾ ਸੰਚਾਰ ਵਧਾਓ:\n✅ ਜ਼ਮੀਨ ਤੋਂ 30 ਸੈਮੀ ਤੱਕ ਹੇਠਲੇ ਪੱਤੇ ਹਟਾਓ\n✅ ਸੰਘਣੀਆਂ ਸ਼ਾਖਾਵਾਂ ਨੂੰ ਕੱਟੋ\n✅ ਪੌਦਿਆਂ ਨੂੰ ਬੰਨ੍ਹੋ\n\n💧 ਪਾਣੀ ਦੇਣ ਦੀਆਂ ਆਦਤਾਂ:\n✅ ਪਾਣੀ ਸਿਰਫ ਜੜ੍ਹ ਵਿੱਚ ਦਿਓ - ਕਦੇ ਉੱਪਰੋਂ ਨਹੀਂ\n✅ ਸਵੇਰੇ ਪਾਣੀ ਦਿਓ\n\n📅 ਰਿਕਵਰੀ: 7-10 ਦਿਨ",
            prevention: "🛡️ ਲੰਬੇ ਸਮੇਂ ਦੀ ਰੋਕਥਾਮ:\n\n🌾 ਫਸਲ ਚੱਕਰ:\n✅ 3 ਸਾਲ ਤੱਕ ਇੱਕੋ ਥਾਂ ਟਮਾਟਰ ਨਾ ਲਗਾਓ\n✅ ਮੱਕੀ, ਫਲ਼ੀਆਂ, ਪਿਆਜ ਨਾਲ ਬਦਲੋ\n\n🌱 ਰੋਧਕ ਕਿਸਮਾਂ:\n✅ ਮਾਉਂਟੇਨ ਸੁਪਰੀਮ, ਡਿਫਾਇੰਟ PhR, ਜੈਸਪਰ, ਜੂਲੀਅਟ\n✅ ਸਥਾਨਕ ਬੀਜ ਵਿਕਰੇਤਾ ਤੋਂ ਪੁੱਛੋ\n\n📏 ਦੂਰੀ ਅਤੇ ਛਾਂਟੀ:\n✅ ਪੌਦਿਆਂ ਵਿੱਚ 45-60 ਸੈਮੀ ਦੀ ਦੂਰੀ ਰੱਖੋ\n✅ ਜ਼ਮੀਨ ਨੂੰ ਛੂਹਣ ਵਾਲੇ ਹੇਠਲੇ ਪੱਤੇ ਹਟਾਓ\n✅ ਨਿਯਮਤ ਛਾਂਟੀ ਕਰੋ\n\n💧 ਪਾਣੀ ਪ੍ਰਬੰਧਨ:\n✅ ਸਿਰਫ ਸਵੇਰੇ ਪਾਣੀ ਦਿਓ\n✅ ਪੱਤਿਆਂ ਨੂੰ ਗਿੱਲਾ ਕਰਨ ਤੋਂ ਬਚੋ\n✅ ਚੰਗੀ ਨਿਕਾਸੀ ਨੂੰ ਯਕੀਨੀ ਬਣਾਓ\n\n🧹 ਸਫਾਈ:\n✅ ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਸਾਰੇ ਪੌਦਿਆਂ ਦੇ ਅਵਸ਼ੇਸ਼ ਹਟਾਓ\n✅ ਬਲੀਚ ਨਾਲ ਔਜ਼ਾਰ ਸਾਫ ਕਰੋ\n✅ ਬਾਗ ਨੂੰ ਨਦੀਨਾਂ ਤੋਂ ਮੁਕਤ ਰੱਖੋ\n\n📱 ਨਿਗਰਾਨੀ:\n✅ ਹਰ 3 ਦਿਨ ਵਿੱਚ ਖੇਤ ਵਿੱਚ ਘੁੰਮੋ\n✅ ਪਹਿਲਾਂ ਹੇਠਲੇ ਪੱਤਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ\n✅ ਐਗਰੋਗਾਰਡ AI ਦੀ ਨਿਯਮਤ ਵਰਤੋਂ ਕਰੋ",
            severity: "ਦਰਮਿਆਨੀ"
        },
        "Tomato_Late_blight": {
            name: "ਲੇਟ ਬਲਾਈਟ",
            description: "⚠️ ਚੇਤਾਵਨੀ: ਲੇਟ ਬਲਾਈਟ ਸਭ ਤੋਂ ਖਤਰਨਾਕ ਟਮਾਟਰ ਰੋਗ ਹੈ!\n\n❓ ਲੇਟ ਬਲਾਈਟ ਕੀ ਹੈ?\n📌 ਕਾਰਨ: ਫਾਈਟੋਫਥੋਰਾ ਇਨਫੈਸਟੈਨਸ (ਪਾਣੀ ਦੀ ਫੰਗਸ)\n📌 3-5 ਦਿਨਾਂ ਵਿੱਚ ਪੂਰੀ ਫਸਲ ਨਸ਼ਟ ਕਰ ਸਕਦਾ ਹੈ\n📌 ਇਹ ਉਹੀ ਰੋਗ ਹੈ ਜਿਸ ਨੇ ਆਇਰਿਸ਼ ਆਲੂ ਕਾਲ ਪੈਦਾ ਕੀਤਾ ਸੀ\n\n🔍 ਲੱਛਣ:\n📌 ਪੱਤਿਆਂ 'ਤੇ ਵੱਡੇ, ਪਾਣੀ ਵਰਗੇ, ਚਿਕਣੇ ਧੱਬੇ\n📌 ਪੱਤਿਆਂ ਦੇ ਹੇਠਾਂ ਚਿੱਟੀ ਫ਼ੰਗਸ\n📌 ਤਣਿਆਂ 'ਤੇ ਕਾਲੇ, ਧਸੇ ਹੋਏ ਕੈਂਕਰ\n📌 ਫਲਾਂ 'ਤੇ ਸਖ਼ਤ, ਚਿਕਣੇ ਭੂਰੇ ਧੱਬੇ\n\n🌡️ ਅਨੁਕੂਲ ਸਥਿਤੀਆਂ:\n📌 ਠੰਡਾ ਤਾਪਮਾਨ: 10-20°C\n📌 ਕਈ ਦਿਨਾਂ ਤੱਕ 90% ਤੋਂ ਵੱਧ ਨਮੀ\n📌 ਕੋਹਰਾ, ਰਿਮਝਿਮ, ਜਾਂ ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਪੱਤਿਆਂ ਦਾ ਗਿੱਲਾ ਰਹਿਣਾ\n\n⚠️ ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਕਾਰਵਾਈ ਕਰੋ!",
            treatment: "🚨 ਐਮਰਜੈਂਸੀ ਕਾਰਵਾਈ:\n\n✅ 1. ਉੱਪਰੋਂ ਪਾਣੀ ਦੇਣਾ ਤੁਰੰਤ ਬੰਦ ਕਰੋ\n✅ 2. ਸਿਰਫ ਜੜ੍ਹ ਵਿੱਚ ਪਾਣੀ ਦਿਓ\n✅ 3. ਗਿੱਲੇ ਕੱਪੜਿਆਂ ਸਮੇਤ ਖੇਤ ਵਿੱਚ ਨਾ ਜਾਓ\n\n✅ 4. ਸੰਕਰਮਿਤ ਪੌਦੇ ਹਟਾਓ\n✅ 5. ਅੱਧ ਤੋਂ ਕੱਟੋ, ਮੋਟੇ ਪਲਾਸਟਿਕ ਬੈਗ ਵਿੱਚ ਪਾਓ\n✅ 6. ਬੈਗ ਬੰਦ ਕਰੋ ਅਤੇ ਸਾੜੋ - ਕਦੇ ਖਾਦ ਵਿੱਚ ਨਾ ਪਾਓ\n\n✅ 7. ਸਭ ਕੁਝ ਕੀਟਾਣੂ ਰਹਿਤ ਕਰੋ\n✅ 8. ਔਜ਼ਾਰ: 10% ਬਲੀਚ ਵਿੱਚ 30 ਸਕਿੰਟ ਲਈ ਡੁਬੋਓ\n✅ 9. ਜੁੱਤੇ: ਬਲੀਚ ਨਾਲ ਸਪਰੇ ਕਰੋ\n✅ 10. ਹੱਥ: ਸਾਬਣ ਅਤੇ ਪਾਣੀ ਨਾਲ ਧੋਵੋ\n\n🧪 ਫੰਜਾਈਸਾਈਡ ਲਗਾਓ:\n✅ ਮੈਟਾਲੈਕਸਿਲ + ਮੈਨਕੋਜ਼ੇਬ - 2.5g/L\n✅ ਸਾਰੇ ਬਚੇ ਪੌਦਿਆਂ 'ਤੇ ਸਪਰੇ ਕਰੋ\n✅ ਹਰ 3-4 ਦਿਨਾਂ ਬਾਅਦ ਦੁਹਰਾਓ\n\n✅ 11. ਗੁਆਂਢੀ ਖੇਤਾਂ ਦੀ ਰੱਖਿਆ ਕਰੋ\n✅ 12. ਨੇੜਲੇ ਕਿਸਾਨਾਂ ਨੂੰ ਤੁਰੰਤ ਸੂਚਿਤ ਕਰੋ\n\n🍅 ਬਚੇ ਫਲ ਜਲਦੀ ਤੋੜੋ\n✅ ਪੱਕੇ ਹਰੇ ਫਲ ਤੋੜੋ\n\n📅 50-70% ਪੌਦੇ ਬਚ ਸਕਦੇ ਹਨ",
            prevention: "🛡️ ਲੰਬੇ ਸਮੇਂ ਦੀ ਰੋਕਥਾਮ:\n\n🌱 ਰੋਧਕ ਕਿਸਮਾਂ:\n✅ ਮਾਉਂਟੇਨ ਮੈਜਿਕ F1, ਡਿਫਾਇੰਟ PhR, ਆਇਰਨ ਲੇਡੀ\n✅ 'ਲੇਟ ਬਲਾਈਟ ਰੋਧਕ' ਬੀਜ ਮੰਗੋ\n\n🌾 ਫਸਲ ਚੱਕਰ:\n✅ ਟਮਾਟਰ, ਆਲੂ, ਸ਼ਿਮਲਾ ਮਿਰਚ ਤੋਂ 3 ਸਾਲ ਦੂਰ ਰਹੋ\n✅ ਖੁੱਲ੍ਹੀ, ਧੁੱਪ ਵਾਲੀ ਥਾਂ ਚੁਣੋ\n\n💧 ਪਾਣੀ ਪ੍ਰਬੰਧਨ:\n✅ ਡ੍ਰਿਪ ਸਿੰਚਾਈ ਦੀ ਵਰਤੋਂ ਕਰੋ - ਕਦੇ ਉੱਪਰੋਂ ਨਹੀਂ\n✅ ਸਿਰਫ ਸਵੇਰੇ ਪਾਣੀ ਦਿਓ\n\n📏 ਦੂਰੀ ਅਤੇ ਛਾਂਟੀ:\n✅ ਪੌਦਿਆਂ ਵਿੱਚ 60-90 ਸੈਮੀ ਦੀ ਦੂਰੀ ਰੱਖੋ\n✅ ਹੇਠਲੇ ਪੱਤੇ ਕੱਟੋ\n✅ ਪੌਦਿਆਂ ਨੂੰ ਬੰਨ੍ਹੋ\n\n🧪 ਨਿਵਾਰਕ ਸਪਰੇ:\n✅ ਜਦੋਂ ਪੌਦੇ 30 ਸੈਮੀ ਲੰਬੇ ਹੋਣ ਤਾਂ ਸ਼ੁਰੂ ਕਰੋ\n✅ ਗਿੱਲੇ ਮੌਸਮ ਵਿੱਚ: ਹਰ 5-7 ਦਿਨਾਂ ਬਾਅਦ ਸਪਰੇ ਕਰੋ\n✅ ਭਾਰੀ ਬਾਰਿਸ਼ ਤੋਂ ਬਾਅਦ: 24 ਘੰਟਿਆਂ ਵਿੱਚ ਸਪਰੇ ਕਰੋ\n\n🧹 ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਸਫਾਈ:\n✅ ਸਾਰੇ ਪੌਦਿਆਂ ਦੇ ਅਵਸ਼ੇਸ਼ ਹਟਾਓ\n✅ ਸਾੜੋ ਜਾਂ ਡੂੰਘੇ ਦੱਬੋ\n\n📱 ਐਗਰੋਗਾਰਡ AI ਦੀ ਨਿਯਮਤ ਵਰਤੋਂ ਕਰੋ",
            severity: "ਗੰਭੀਰ"
        },
        "Tomato_healthy": {
            name: "ਸਿਹਤਮੰਦ",
            description: "✅ ਪੌਦੇ ਦੀ ਸਥਿਤੀ: ਸਿਹਤਮੰਦ\n😊 ਕੋਈ ਬੀਮਾਰੀ ਨਹੀਂ ਮਿਲੀ\n\nਤੁਹਾਡਾ ਟਮਾਟਰ ਦਾ ਪੌਦਾ ਬਹੁਤ ਵਧੀਆ ਲੱਗ ਰਿਹਾ ਹੈ! AI ਨੂੰ ਕੋਈ ਬੀਮਾਰੀ ਦੇ ਲੱਛਣ ਨਹੀਂ ਮਿਲੇ।\n\n🔍 ਜਾਂਚ ਕੀਤੀ:\n📌 ਪੱਤਿਆਂ ਦਾ ਰੰਗ: ਆਮ ਹਰਾ\n📌 ਕੋਈ ਧੱਬੇ ਜਾਂ ਜ਼ਖ਼ਮ ਨਹੀਂ\n📌 ਕੋਈ ਫ਼ੰਗਸ ਵਾਧਾ ਨਹੀਂ\n📌 ਕੋਈ ਕੀੜੇ ਨੁਕਸਾਨ ਨਹੀਂ\n\n🌿 ਚੰਗਾ ਕੰਮ ਕਰਦੇ ਰਹੋ!",
            treatment: "🌱 ਕਿਸੇ ਇਲਾਜ ਦੀ ਲੋੜ ਨਹੀਂ\n\n📅 ਰੁਟੀਨ ਦੇਖਭਾਲ:\n\n💧 ਪਾਣੀ:\n✅ ਹਫਤੇ ਵਿੱਚ 2-3 ਵਾਰ ਡੂੰਘਾ ਪਾਣੀ ਦਿਓ\n✅ ਹਮੇਸ਼ਾ ਜੜ੍ਹ ਵਿੱਚ ਪਾਣੀ ਦਿਓ\n✅ ਸਭ ਤੋਂ ਵਧੀਆ ਸਮਾਂ: ਸਵੇਰ (6-9 ਵਜੇ)\n\n🌿 ਖਾਦ:\n✅ ਹਰ 2 ਹਫਤੇ ਵਿੱਚ: ਸੰਤੁਲਿਤ NPK (10-10-10)\n\n✂️ ਛਾਂਟੀ:\n✅ ਸਕਰਸ ਹਟਾਓ\n✅ ਪੀਲੇ ਜਾਂ ਮਰੇ ਪੱਤੇ ਹਟਾਓ\n✅ 1-2 ਮੁੱਖ ਤਣੇ ਰੱਖੋ\n\n🐞 ਕੀੜੇ ਨਿਗਰਾਨੀ:\n✅ ਹਫਤੇ ਵਿੱਚ ਪੱਤਿਆਂ ਦੇ ਹੇਠਾਂ ਜਾਂਚ ਕਰੋ\n\n📱 ਹਰ 1-2 ਹਫਤੇ ਵਿੱਚ ਸਕੈਨ ਕਰੋ",
            prevention: "🛡️ ਬਿਮਾਰੀ ਤੋਂ ਬਚਣ ਲਈ:\n\n🌿 ਮਿੱਟੀ ਦੀ ਤਿਆਰੀ:\n✅ ਮਿੱਟੀ ਦਾ ਪੀਐਚ ਜਾਂਚੋ - ਆਦਰਸ਼ 6.0-6.8\n✅ ਬਿਜਾਈ ਤੋਂ ਪਹਿਲਾਂ ਖਾਦ ਪਾਓ\n✅ ਚੰਗੀ ਨਿਕਾਸੀ ਯਕੀਨੀ ਬਣਾਓ\n\n🌱 ਬਿਜਾਈ:\n✅ ਪ੍ਰਮਾਣਿਤ ਬੀਜ ਖਰੀਦੋ\n✅ ਪੌਦਿਆਂ ਵਿੱਚ 45-60 ਸੈਮੀ ਦੀ ਦੂਰੀ ਰੱਖੋ\n\n🍂 ਮਲਚਿੰਗ:\n✅ 5-10 ਸੈਮੀ ਤੂੜੀ ਜਾਂ ਸੁੱਕੇ ਪੱਤੇ ਪਾਓ\n\n💧 ਪਾਣੀ ਦੇ ਨਿਯਮ:\n✅ ਸਿਰਫ ਜੜ੍ਹ ਵਿੱਚ, ਸਵੇਰੇ ਪਾਣੀ ਦਿਓ\n✅ ਡ੍ਰਿਪ ਸਿੰਚਾਈ ਦੀ ਵਰਤੋਂ ਕਰੋ\n\n🔄 ਫਸਲ ਚੱਕਰ:\n✅ 3 ਸਾਲ ਤੱਕ ਇੱਕੋ ਥਾਂ ਟਮਾਟਰ ਨਾ ਲਗਾਓ\n\n🧹 ਸਫਾਈ:\n✅ ਵਾਢੀ ਤੋਂ ਬਾਅਦ ਸਾਰੇ ਪੌਦਿਆਂ ਦੇ ਅਵਸ਼ੇਸ਼ ਹਟਾਓ\n✅ ਬਲੀਚ ਨਾਲ ਔਜ਼ਾਰ ਸਾਫ ਕਰੋ\n✅ ਬਾਗ ਨੂੰ ਨਦੀਨਾਂ ਤੋਂ ਮੁਕਤ ਰੱਖੋ\n\n📱 ਐਗਰੋਗਾਰਡ AI ਦੀ ਨਿਯਮਤ ਵਰਤੋਂ ਕਰੋ",
            severity: "ਕੋਈ ਨਹੀਂ"
        }
    }
};

// Global variable to store last result for re-translation
window.lastResult = null;
window.currentLang = localStorage.getItem('lang') || 'en';

// Function to translate result based on current language
function translateResult(diseaseName, lang) {
    const trans = diseaseTranslations[lang] || diseaseTranslations['en'];
    return trans[diseaseName] || trans['Tomato_healthy'];
}

const API_BASE = 'https://agroguard-ai-6xil.onrender.com';
window.API_BASE = API_BASE;
const SUPPORTED_LANGS = { en: 'English', hi: 'हिन्दी', pa: 'ਪੰਜਾਬੀ' };

// ─── i18n ─────────────────────────────────────────────────────────────────────
let _translations = {};
let _currentLang = localStorage.getItem('lang') || 'en';

async function loadTranslations(lang) {
    try {
        const res = await fetch(`/translations/${lang}.json`);
        _translations = await res.json();
        _currentLang = lang;
        window.currentLang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations();

        if (window.lastResult) {
            updateResultTranslation(window.lastResult);
        }
    } catch (e) {
        console.warn('Failed to load translations for', lang);
    }
}

function t(key) {
    return _translations[key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = t(key);
        } else {
            el.textContent = t(key);
        }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.title = t(el.dataset.i18nTitle);
    });
    document.documentElement.lang = _currentLang;
}

function initLangSelector() {
    const sel = document.getElementById('langSelect');
    if (!sel) return;
    sel.value = _currentLang;
    sel.addEventListener('change', () => loadTranslations(sel.value));
}

function updateResultTranslation(result) {
    const lang = _currentLang;
    const translated = translateResult(result.disease_name, lang);

    const diseaseNameElem = document.getElementById('resultDisease');
    const severityElem = document.getElementById('resultSeverity');
    const descElem = document.getElementById('tab-description');
    const treatmentElem = document.getElementById('tab-treatment');
    const preventionElem = document.getElementById('tab-prevention');

    if (diseaseNameElem) diseaseNameElem.innerHTML = `<strong>${translated.name}</strong>`;
    if (severityElem) {
        severityElem.textContent = translated.severity;
        severityElem.className = `severity-badge ${severityClass(result.severity)}`;
    }
    if (descElem) descElem.innerHTML = translated.description.replace(/\n/g, '<br>');
    if (treatmentElem) treatmentElem.innerHTML = translated.treatment.replace(/\n/g, '<br>');
    if (preventionElem) preventionElem.innerHTML = translated.prevention.replace(/\n/g, '<br>');
}

// ─── Auth ──────────────────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem('token'); }
function getUser() { try { return JSON.parse(localStorage.getItem('user')); } catch { return null; } }

function setAuth(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
}

function clearAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.lastResult = null;
}

function isLoggedIn() { return !!getToken(); }

function updateNavbar() {
    const loginBtn = document.getElementById('navLoginBtn');
    const userChip = document.getElementById('navUserChip');
    const userName = document.getElementById('navUserName');
    const user = getUser();

    if (isLoggedIn() && user) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (userChip) userChip.classList.remove('hidden');
        if (userName) userName.textContent = user.name ? user.name.split(' ')[0] : 'User';
        const avatar = document.getElementById('navAvatar');
        if (avatar) avatar.textContent = user.name ? user.name.charAt(0).toUpperCase() : 'U';
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (userChip) userChip.classList.add('hidden');
    }
}

// ─── API Client ────────────────────────────────────────────────────────────────
async function api(method, path, body = null, formData = false) {
    const headers = {};
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const opts = { method, headers };

    if (body && !formData) {
        headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(body);
    } else if (formData) {
        opts.body = body;
    }

    const res = await fetch(`${API_BASE}${path}`, opts);

    if (res.status === 401) {
        clearAuth();
        updateNavbar();
        throw new Error('Unauthorized. Please login.');
    }

    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.detail || `HTTP ${res.status}`);
    return data;
}

// ─── Notifications ─────────────────────────────────────────────────────────────
let _notifTimeout;
function notify(message, type = 'info', duration = 4000) {
    let container = document.getElementById('notifContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notifContainer';
        container.style.cssText = 'position:fixed;top:80px;right:1.5rem;z-index:9000;display:flex;flex-direction:column;gap:0.5rem;';
        document.body.appendChild(container);
    }

    const el = document.createElement('div');
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    el.className = `alert alert-${type}`;
    el.style.cssText = 'min-width:280px;max-width:400px;box-shadow:0 8px 24px rgba(0,0,0,0.4);cursor:pointer;';
    el.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
    el.onclick = () => el.remove();

    container.appendChild(el);
    setTimeout(() => el.remove(), duration);
}

// ─── Severity Colors ───────────────────────────────────────────────────────────
function severityClass(sev) {
    const map = { none: 'sev-none', medium: 'sev-medium', high: 'sev-high', critical: 'sev-critical' };
    return map[sev] || 'sev-medium';
}

function severityLabel(sev) {
    const map = { none: t('severity_none'), medium: t('severity_medium'), high: t('severity_high'), critical: t('severity_critical') };
    return map[sev] || sev;
}

function formatDisease(name) {
    return name.replace(/Tomato__/, '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
}

function fmtDate(iso) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
}

function renderConfidenceRing(container, confidence) {
    const pct = Math.round(confidence * 100);
    const r = 24;
    const circ = 2 * Math.PI * r;
    const fill = circ * confidence;

    container.innerHTML = `
    <svg width="60" height="60" viewBox="0 0 60 60">
      <circle class="ring-bg" cx="30" cy="30" r="${r}" />
      <circle class="ring-fill" cx="30" cy="30" r="${r}"
        stroke-dasharray="${fill} ${circ}"
        style="stroke:${confidence >= 0.85 ? 'var(--leaf)' : confidence >= 0.6 ? 'var(--sev-medium)' : 'var(--sev-high)'}"/>
    </svg>
    <div class="confidence-val">${pct}%</div>
  `;
}

// ─── Show Result with Translations and Tab Support ─────────────────────
function showResult(result) {
    window.lastResult = result;
    const lang = _currentLang;
    const translated = translateResult(result.disease_name, lang);

    const diseaseNameElem = document.getElementById('resultDisease');
    const severityElem = document.getElementById('resultSeverity');
    const confidenceElem = document.getElementById('confidenceRing');
    const descElem = document.getElementById('tab-description');
    const treatmentElem = document.getElementById('tab-treatment');
    const preventionElem = document.getElementById('tab-prevention');
    const resultSection = document.getElementById('resultSection');
    const resultActions = document.getElementById('resultActions');

    if (diseaseNameElem) diseaseNameElem.innerHTML = `<strong>${translated.name}</strong>`;
    if (severityElem) {
        severityElem.textContent = translated.severity;
        severityElem.className = `severity-badge ${severityClass(result.severity)}`;
    }
    if (confidenceElem && result.confidence) renderConfidenceRing(confidenceElem, result.confidence);

    if (descElem) descElem.innerHTML = translated.description.replace(/\n/g, '<br>');
    if (treatmentElem) treatmentElem.innerHTML = translated.treatment.replace(/\n/g, '<br>');
    if (preventionElem) preventionElem.innerHTML = translated.prevention.replace(/\n/g, '<br>');

    if (resultSection) resultSection.style.display = 'block';
    if (resultActions) resultActions.style.display = 'flex';

    // Re-attach tab handlers after content update
    attachTabHandlers();

    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Function to attach tab click handlers (Fixes tabs not working)
function attachTabHandlers() {
    const tabs = document.querySelectorAll('.result-tab');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        // Remove old listener by cloning
        const newTab = tab.cloneNode(true);
        if (tab.parentNode) {
            tab.parentNode.replaceChild(newTab, tab);
        }

        newTab.addEventListener('click', function (e) {
            const target = this.getAttribute('data-tab');
            // Remove active class from all tabs
            document.querySelectorAll('.result-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Hide all panes
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            // Show selected pane
            const activePane = document.getElementById(`tab-${target}`);
            if (activePane) activePane.classList.add('active');
        });
    });
}

function getUserLocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) return resolve(null);
        navigator.geolocation.getCurrentPosition(
            pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            () => resolve(null),
            { timeout: 5000 }
        );
    });
}

// ─── Exports ──────────────────────────────────────────────────────────────────
window.api = api;
window.notify = notify;
window.getToken = getToken;
window.getUser = getUser;
window.setAuth = setAuth;
window.clearAuth = clearAuth;
window.isLoggedIn = isLoggedIn;
window.updateNavbar = updateNavbar;
window.formatDisease = formatDisease;
window.fmtDate = fmtDate;
window.severityClass = severityClass;
window.renderConfidenceRing = renderConfidenceRing;
window.showResult = showResult;
window.translateResult = translateResult;
window.updateResultTranslation = updateResultTranslation;

// ─── Init ──────────────────────────────────────────────────────────────────────
(async function init() {
    await loadTranslations(_currentLang);
    initLangSelector();
    updateNavbar();

    const resultSection = document.getElementById('resultSection');
    if (resultSection && resultSection.style.display === 'block' && window.lastResult) {
        updateResultTranslation(window.lastResult);
    }
    console.log('✅ App initialized');
})();

// ==================== LEAF IMAGE VALIDATION (Frontend) ====================
function validateLeafImage(file) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const data = imageData.data;

            let greenPixels = 0;
            let totalPixels = data.length / 4;

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                if (g > r && g > b && g > 60) {
                    greenPixels++;
                }
            }

            const greenRatio = greenPixels / totalPixels;
            console.log('🌿 Frontend green ratio:', greenRatio);
            resolve(greenRatio > 0.03);
        };
        img.src = URL.createObjectURL(file);
    });
}

// ==================== EMERGENCY LOOP FIX ====================
if (window._APP_INITIALIZED) {
    console.log('⚠️ App already initialized, skipping...');
} else {
    window._APP_INITIALIZED = true;
    console.log('✅ App initializing first time');
}

// ============================================
// 📄 PDF GENERATOR - COMPLETE CLEAN VERSION WITH LEAF PHOTO
// ============================================

// ============================================
// 📄 PDF GENERATOR - EXACTLY AS SCREENSHOT
// ============================================

function cleanPDFText(text) {
    if (!text) return '';
    if (typeof text !== 'string') return text;

    const replacements = {
        'Q=0?': '',
        'Q=Y': '',
        '&p': '',
        'Q=U': '',
        'Q=P=Q': '',
        'Q<B?': 'AgroGuard AI',
        'Q=ÜE': '',
        'Q=ÜS': '',
        'Q=B?': '',
        'Q>Y': '',
        '©YQ<B?': 'AgroGuard AI'
    };

    let cleaned = text;
    Object.keys(replacements).forEach(key => {
        cleaned = cleaned.replace(new RegExp(key, 'g'), replacements[key]);
    });
    cleaned = cleaned.replace(/[^\w\s.,!?():;\-]/g, ' ').replace(/\s+/g, ' ').trim();
    return cleaned;
}

function generatePDF(result) {
    console.log('📄 Generating clean PDF...');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210;
    let y = 20;
    const leftMargin = 20;

    // ===== CLEAN DATA =====
    const disease = cleanPDFText(result.disease) || 'Unknown Disease';
    const confidence = result.confidence ? (result.confidence * 100).toFixed(1) + '%' : 'N/A';
    const severity = cleanPDFText(result.severity) || 'Unknown';
    const description = cleanPDFText(result.description) || 'No description available.';
    const treatment = cleanPDFText(result.treatment) || 'No treatment available.';
    const prevention = cleanPDFText(result.prevention) || 'No prevention available.';
    const farmerName = localStorage.getItem('userName') || 'Farmer';
    const location = localStorage.getItem('userLocation') || 'Not set';

    // ===== DATE (Top Right) =====
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    const today = new Date();
    const dateStr = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    doc.text(dateStr, pageWidth - 25, y);
    y += 10;

    // ===== TITLE: Disease Name =====
    doc.setFontSize(28);
    doc.setTextColor(0, 0, 0);
    doc.text(disease, leftMargin, y);
    y += 12;

    // ===== SEVERITY BADGE (colored) =====
    const severityColors = {
        'low': [0, 128, 0],
        'medium': [255, 165, 0],
        'high': [255, 0, 0],
        'critical': [180, 0, 0]
    };
    const color = severityColors[severity.toLowerCase()] || [0, 0, 0];
    doc.setFontSize(13);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(severity.toUpperCase(), leftMargin, y);
    y += 8;

    // ===== CONFIDENCE =====
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Confidence: ${confidence}`, leftMargin, y);
    y += 8;

    // ===== FARMER NAME & LOCATION =====
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    doc.text(`Farmer: ${farmerName}`, leftMargin, y);
    y += 6;
    doc.text(`Location: ${location}`, leftMargin, y);
    y += 12;

    // ===== DIVIDER =====
    doc.setDrawColor(200, 200, 200);
    doc.line(leftMargin, y, pageWidth - leftMargin, y);
    y += 10;

    // ===== SCANNED LEAF IMAGE =====
    const previewImg = document.getElementById('imagePreview');
    if (previewImg && previewImg.src && previewImg.src.startsWith('data:image')) {
        try {
            const imgWidth = 80;
            const imgHeight = 80;
            const imgX = (pageWidth - imgWidth) / 2;
            doc.addImage(previewImg.src, 'JPEG', imgX, y, imgWidth, imgHeight);
            y += imgHeight + 8;

            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text('Scanned Leaf', pageWidth / 2, y, { align: 'center' });
            y += 10;
        } catch (e) {
            console.warn('⚠️ Could not add leaf image:', e);
        }
    }

    // ===== DIVIDER =====
    doc.setDrawColor(200, 200, 200);
    doc.line(leftMargin, y, pageWidth - leftMargin, y);
    y += 10;

    // ===== DESCRIPTION =====
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('DESCRIPTION', leftMargin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const descLines = doc.splitTextToSize(description, 170);
    doc.text(descLines, leftMargin, y);
    y += (descLines.length * 5) + 10;

    // ===== TREATMENT PLAN =====
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('TREATMENT PLAN', leftMargin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const treatLines = doc.splitTextToSize(treatment, 170);
    doc.text(treatLines, leftMargin, y);
    y += (treatLines.length * 5) + 10;

    // ===== CHECK IF NEW PAGE NEEDED =====
    if (y > 230) {
        doc.addPage();
        y = 20;
    }

    // ===== PREVENTION =====
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('PREVENTION', leftMargin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    const prevLines = doc.splitTextToSize(prevention, 170);
    doc.text(prevLines, leftMargin, y);
    y += (prevLines.length * 5) + 10;

    // ===== FOOTER =====
    y = 275;
    doc.setDrawColor(200, 200, 200);
    doc.line(leftMargin, y, pageWidth - leftMargin, y);
    y += 5;

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('🌾 AgroGuard AI - Diagnose. Treat. Save the Harvest.', leftMargin, y + 5);
    doc.text('Made in India 🇮🇳 | v1.0', leftMargin, y + 11);
    doc.text('Disclaimer: Consult a local agronomist for critical cases.', leftMargin, y + 17);

    // ===== SAVE =====
    const fileName = `AgroGuard_${disease.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
    console.log('✅ PDF saved:', fileName);

    if (typeof notify === 'function') {
        notify('📄 PDF downloaded successfully!', 'success');
    }
}

console.log('✅ PDF Generator Ready!');
// ============================================
// 🎥 VIDEO PLAY/PAUSE CONTROLS
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('demoVideo');
    const playOverlay = document.getElementById('playOverlay');

    if (video && playOverlay) {
        // 🔥 Click on video = Play
        video.addEventListener('click', function (e) {
            if (this.paused) {
                this.play();
                playOverlay.classList.add('hidden');
            } else {
                this.pause();
                playOverlay.classList.remove('hidden');
            }
        });

        // 🔥 Click on play button = Play
        playOverlay.addEventListener('click', function (e) {
            e.stopPropagation();
            video.play();
            this.classList.add('hidden');
        });

        // 🔥 When video ends, show play button again
        video.addEventListener('ended', function () {
            playOverlay.classList.remove('hidden');
        });

        // 🔥 When video is paused by user, show play button
        video.addEventListener('pause', function () {
            if (!this.ended) {
                playOverlay.classList.remove('hidden');
            }
        });
    }
});

// ============================================
// 📄 PDF BUTTON - FIXED
// ============================================

console.log('🔥 Loading PDF Generator...');

// Wait for DOM
document.addEventListener('DOMContentLoaded', function () {
    console.log('📄 Setting up PDF button...');

    // Try to find button after a short delay
    setTimeout(function () {
        const pdfBtn = document.getElementById('pdfBtn');

        if (!pdfBtn) {
            console.warn('⚠️ PDF Button not found in DOM');
            return;
        }

        console.log('✅ PDF Button found!');

        // Remove old listeners (if any)
        const newBtn = pdfBtn.cloneNode(true);
        pdfBtn.parentNode.replaceChild(newBtn, pdfBtn);

        // Add click listener
        newBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('🖱️ PDF button clicked!');

            // Check result
            const result = window._result;
            console.log('📊 Result:', result);

            if (!result) {
                alert('⚠️ Please scan a leaf first!');
                return;
            }

            // Check jsPDF
            if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
                console.error('❌ jsPDF not loaded!');
                alert('⏳ PDF library loading... Please wait.');
                return;
            }

            // Generate PDF
            this.disabled = true;
            this.textContent = '⏳ Generating...';

            try {
                generatePDF(result);
                this.disabled = false;
                this.textContent = '📄 Download PDF';
            } catch (error) {
                console.error('❌ Error:', error);
                alert('Error: ' + error.message);
                this.disabled = false;
                this.textContent = '📄 Download PDF';
            }
        });

        console.log('✅ PDF Button ready!');

    }, 500);
});

console.log('✅ PDF Generator loaded successfully!');