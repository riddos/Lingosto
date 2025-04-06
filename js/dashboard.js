import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwYxsjKgQWynx7k0iALM1U7p_KIOPeYVk",
  authDomain: "lingosto.firebaseapp.com",
  projectId: "lingosto",
  storageBucket: "lingosto.firebasestorage.app",
  messagingSenderId: "433536212857",
  appId: "1:433536212857:web:e1bf2d61585f65c57f19a8",
  measurementId: "G-T0M1QSQJ5N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    // Handle authentication state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is authenticated, stay on dashboard.html
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const username = userDoc.exists() ? userDoc.data().username : user.email.split('@')[0];
            
            const greetingElement = document.getElementById('user-greeting');
            if (greetingElement) {
                greetingElement.innerHTML = `Hi, <strong>${username}</strong>!`;
            }
            
            // Add click handler for logout button
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    signOut(auth).then(() => {
                        window.location.href = '/Lingosto/index.html'; // Use absolute path to index.html
                    }).catch((error) => {
                        console.error('Error signing out:', error);
                    });
                });
            }
        } else {
            // User is not authenticated, redirect to index.html
            window.location.href = '/Lingosto/index.html';
        }
    });

    const homeIcon = document.querySelector('a.logo');
    if (homeIcon) {
        homeIcon.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default navigation
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Redirect to the correct path for dashboard.html
                    window.location.href = '/Lingosto/dashboard.html';
                } else {
                    // Redirect to the correct path for index.html
                    window.location.href = '/Lingosto/index.html';
                }
            });
        });
    }
});