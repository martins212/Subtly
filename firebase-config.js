// ============================================================
// PASTE YOUR FIREBASE CONFIG BELOW.
// Get this from: Firebase Console → Project Settings → General
// → "Your apps" → Web app → SDK setup and configuration.
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyDX64Rj32ZW7ub25bWg0gTUgOnjnCC--pw",
  authDomain: "subway-f7834.firebaseapp.com",
  projectId: "subway-f7834",
  storageBucket: "subway-f7834.firebasestorage.app",
  messagingSenderId: "111990087218",
  appId: "1:111990087218:web:ff8f2fec326ecb1dcc262b",
  measurementId: "G-C2DD5SY3HE"
};

const FIREBASE_NOT_CONFIGURED = firebaseConfig.apiKey === "YOUR_API_KEY";

if (!FIREBASE_NOT_CONFIGURED) {
  firebase.initializeApp(firebaseConfig);
}

// Redirects to login.html if no user is signed in. Call on protected pages.
function requireAuth() {
  if (FIREBASE_NOT_CONFIGURED) return;
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) window.location.href = "login.html";
  });
}

// Like requireAuth, but also hands the signed-in user to a callback —
// used by pages that need to load per-user data (e.g. Firestore).
function initPageAuth(onUser) {
  if (FIREBASE_NOT_CONFIGURED) return;
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) { window.location.href = "login.html"; return; }
    if (onUser) onUser(user);
  });
}

// Sends an already-signed-in user away from the login page.
function redirectIfSignedIn() {
  if (FIREBASE_NOT_CONFIGURED) return;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) window.location.href = "player.html";
  });
}

function signOutUser() {
  if (FIREBASE_NOT_CONFIGURED) return;
  firebase.auth().signOut().then(function() {
    window.location.href = "index.html";
  });
}
