// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqjE3TmrZyNcJS904Hh8l5NiDLYn6LC6E",
    authDomain: "bike-haven-29ec7.firebaseapp.com",
    projectId: "bike-haven-29ec7",
    storageBucket: "bike-haven-29ec7.firebasestorage.app",
    messagingSenderId: "42407371897",
    appId: "1:42407371897:web:feb42c89bd81dc0bad20a8",
    measurementId: "G-BZ6BB4DC65"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Export for use in other files
window.auth = auth;
window.db = db;
