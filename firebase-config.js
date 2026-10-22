// Firebase Console से अपनी web app की config यहाँ डालें.
// यह config public होती है; Firebase Console में Authentication और authorized domains सही सेट करें.
// किसी भी हालत में service-account private key यहाँ न डालें.
export const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  appId: "PASTE_YOUR_FIREBASE_APP_ID"
};
export const firebaseReady =
  firebaseConfig.apiKey !== "PASTE_YOUR_FIREBASE_API_KEY" &&
  firebaseConfig.projectId !== "PASTE_YOUR_PROJECT_ID" &&
  firebaseConfig.appId !== "PASTE_YOUR_FIREBASE_APP_ID";
