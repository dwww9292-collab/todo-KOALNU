// ============================================
// Firebase 초기화
// 다른 스크립트에서 window.firebaseApp / window.firebaseDb / window.firebaseAuth 로 접근
// ============================================
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTq0o3EXiAelY4bRGZOXoIFxyaxwLfsqY",
  authDomain: "noonatodobackend.firebaseapp.com",
  databaseURL: "https://noonatodobackend-default-rtdb.firebaseio.com/",
  projectId: "noonatodobackend",
  storageBucket: "noonatodobackend.firebasestorage.app",
  messagingSenderId: "942724525988",
  appId: "1:942724525988:web:520e372880f77e4d2fdb31",
  measurementId: "G-9QMG749DWS"
};

export const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

window.firebaseApp = app;
window.firebaseAnalytics = analytics;

console.log("[Firebase] 초기화 완료:", firebaseConfig.projectId);
