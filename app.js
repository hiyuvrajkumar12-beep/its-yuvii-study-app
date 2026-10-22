import { firebaseConfig, firebaseReady } from "./firebase-config.js";

const authDialog = document.querySelector("#auth-dialog");
const subjectDialog = document.querySelector("#subject-dialog");
const authForm = document.querySelector("#auth-form");
const authMessage = document.querySelector("#auth-message");
const authTitle = document.querySelector("#auth-title");
const authDescription = document.querySelector("#auth-description");
const authSubmit = document.querySelector("#auth-submit");
const switchMode = document.querySelector("#switch-mode");
const switchText = document.querySelector("#switch-text");
let signupMode = false;
let auth = null;
let createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged;

async function initFirebase() {
  if (!firebaseReady) return;
  try {
    const appSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
    const authSdk = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const app = appSdk.initializeApp(firebaseConfig);
    auth = authSdk.getAuth(app);
    ({createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} = authSdk);
    onAuthStateChanged(auth, user => renderUser(user));
  } catch (error) {
    console.error(error);
    setMessage("Firebase setup में समस्या है। Config और internet connection जाँचें।");
  }
}
function setMessage(message, ok=false) {
  authMessage.textContent = message;
  authMessage.classList.toggle("ok", ok);
}
function openAuth() {
  setMessage("");
  if (!authDialog.open) authDialog.showModal();
}
function renderUser(user) {
  const actions = document.querySelector("#user-actions");
  const title = document.querySelector("#welcome-title");
  const sub = document.querySelector("#welcome-sub");
  const email = document.querySelector("#user-email");
  if (user) {
    actions.classList.remove("hidden");
    email.textContent = user.email || "Logged in";
    title.textContent = "Welcome back!";
    sub.textContent = "आप लॉगिन हैं। आज का study session शुरू करें।";
    document.querySelector("#auth-open").textContent = "My account";
  } else {
    actions.classList.add("hidden");
    title.textContent = "Welcome, Future Doctor!";
    sub.textContent = "लॉगिन करके अपनी पढ़ाई की यात्रा शुरू करें।";
    document.querySelector("#auth-open").textContent = "Login / Sign up";
  }
}
document.querySelector("#auth-open").addEventListener("click", openAuth);
document.querySelector("#hero-login").addEventListener("click", openAuth);
document.querySelector("#subject-login").addEventListener("click", () => { subjectDialog.close(); openAuth(); });
switchMode.addEventListener("click", () => {
  signupMode = !signupMode;
  authTitle.textContent = signupMode ? "Create your account" : "Welcome to IT'S YUVII";
  authDescription.textContent = signupMode ? "अपना free study account बनाएँ।" : "अपने study account में प्रवेश करें।";
  authSubmit.textContent = signupMode ? "Create account" : "Login";
  switchText.textContent = signupMode ? "पहले से अकाउंट है?" : "नया अकाउंट चाहिए?";
  switchMode.textContent = signupMode ? "Login" : "Sign up";
  document.querySelector("#password").autocomplete = signupMode ? "new-password" : "current-password";
  setMessage("");
});
authForm.addEventListener("submit", async event => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  if (!firebaseReady || !auth) {
    setMessage("Login चालू करने के लिए README में Firebase setup करें। अभी demo dashboard देखा जा सकता है।");
    return;
  }
  authSubmit.disabled = true;
  authSubmit.textContent = signupMode ? "Creating..." : "Logging in...";
  try {
    if (signupMode) await createUserWithEmailAndPassword(auth, email, password);
    else await signInWithEmailAndPassword(auth, email, password);
    setMessage(signupMode ? "Account बन गया!" : "Login सफल!", true);
    setTimeout(() => authDialog.close(), 500);
  } catch (error) {
    const messages = {
      "auth/email-already-in-use": "यह email पहले से registered है। Login करें।",
      "auth/invalid-email": "Email address सही नहीं है।",
      "auth/weak-password": "Password कम से कम 6 अक्षर का रखें।",
      "auth/invalid-credential": "Email या password सही नहीं है।",
      "auth/too-many-requests": "कई कोशिशें हुई हैं। थोड़ी देर बाद फिर कोशिश करें।"
    };
    setMessage(messages[error.code] || "Login नहीं हो पाया: " + error.message);
  } finally {
    authSubmit.disabled = false;
    authSubmit.textContent = signupMode ? "Create account" : "Login";
  }
});
document.querySelector("#logout").addEventListener("click", async () => {
  if (auth && signOut) await signOut(auth);
});
document.querySelectorAll(".subject-btn").forEach(button => button.addEventListener("click", () => {
  document.querySelector("#subject-title").textContent = button.dataset.subject;
  subjectDialog.showModal();
}));
initFirebase();
