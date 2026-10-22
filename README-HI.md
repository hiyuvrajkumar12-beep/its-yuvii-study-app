# IT'S YUVII — Free starter project

यह responsive starter website है। इसमें landing page, Physics/Chemistry/Biology subject cards और Firebase Email/Password login का code है। Firebase config लगाए बिना UI/demo dashboard दिखेगा, लेकिन login/sign-up काम नहीं करेगा।

## 1. Computer पर चलाएँ
1. ZIP extract करें।
2. VS Code में folder खोलें।
3. VS Code का Live Server extension install करें और `index.html` पर **Open with Live Server** चुनें। या Python installed हो तो folder में terminal खोलकर `python -m http.server 8000` चलाएँ और `http://localhost:8000` खोलें।
4. ES modules के लिए file को `file://` से सीधे न खोलें।

## 2. Firebase में free login सेट करें
1. https://console.firebase.google.com/ खोलें और Google account से sign in करें।
2. **Create a project** चुनें; नाम `its-yuvii-study` रख सकते हैं। Analytics optional है।
3. Project Overview में Web (`</>`) app जोड़ें। App nickname `IT'S YUVII` रखें।
4. Firebase जो config दिखाए, उसमें से `apiKey`, `authDomain`, `projectId`, `appId` को `firebase-config.js` की values में भरें।
5. Firebase Console → **Authentication** → Get started → **Sign-in method** → **Email/Password** enable करें।
6. Authentication → **Settings** → Authorized domains में अपना deployed domain जोड़ें (localhost आम तौर पर development के लिए पहले से रहता है)।
7. Save करें और साइट reload करके Sign up टेस्ट करें।

ध्यान दें: Firebase web config browser में दिखाई देती है; इसे secret password न समझें। Firebase Rules और Authentication settings सुरक्षित रखें। Service-account key कभी भी वेबसाइट में न डालें।

## 3. Website को मुफ्त deploy करें (GitHub + Vercel)
1. https://github.com/ पर account बनाएँ / login करें।
2. New repository बनाएँ, जैसे `its-yuvii-study-app`। शुरुआत में Public repository चुन सकते हैं।
3. इस folder की सभी files repository में upload करें (Add file → Upload files → Commit changes)।
4. https://vercel.com/ पर GitHub से login करें।
5. **Add New → Project** चुनें, `its-yuvii-study-app` repository import करें।
6. Framework preset **Other** चुनें; Build Command और Output Directory खाली छोड़ें (या static site settings में root directory `./` रखें)।
7. Deploy दबाएँ। Vercel एक public `*.vercel.app` URL देगा।
8. उस URL को Firebase Authentication → Settings → Authorized domains में जोड़ें।
9. `firebase-config.js` में config update करके GitHub पर commit करें; Vercel फिर deploy कर देगा।

## 4. Android पर इस्तेमाल
पहले website deploy करें। Android Chrome में अपनी Vercel website खोलें → ⋮ menu → **Add to Home screen** या **Install app** (जो विकल्प दिखे) चुनें। इससे मोबाइल पर app-जैसा shortcut मिलेगा। यह Play Store APK नहीं है।

## 5. अगला चरण
- Chapter-wise notes और NCERT-based content
- Mock tests और score history
- Video lessons
- Profile / password reset
- यदि Play Store पर native Android app चाहिए तो बाद में Capacitor या Android Studio build करें; Play Console की registration fee हो सकती है।

## Important
यह starter है, पूरी production-ready learning platform नहीं। अभी subject cards demo placeholders हैं। Public launch से पहले privacy policy, account deletion, Firebase security configuration, accessibility और mobile testing करें। Free-tier limits और provider terms बदल सकते हैं।
