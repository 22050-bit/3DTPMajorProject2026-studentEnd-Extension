//FANCY FIREBASE FIRESTOR STUFF
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuEz3JIVLCKUV-_jlmRytldLJU5qnnFZM",
  authDomain: "test-bdb0b.firebaseapp.com",
  projectId: "test-bdb0b",
  storageBucket: "test-bdb0b.firebasestorage.app",
  messagingSenderId: "572350694455",
  appId: "1:572350694455:web:c06d6dd4ce637bb8ab2bb2",
  measurementId: "G-WV58WKDE5M"
};

const fireBase = initializeApp(firebaseConfig);
//FANCY STUFF ENDS HERE

try { const app = initializeApp(firebaseConfig); 
    const db = getFirestore(app); 
    console.log("✅ Firebase initialized"); 
    console.log("Firestore instance:", db); 
} 
catch (err) { 
    console.error("❌ Firebase initialization failed:", err); 
} 