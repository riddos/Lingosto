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

// Function to handle navigation based on auth state
export function setupAuthNavigation() {
    onAuthStateChanged(auth, async (user) => {
        const logoLink = document.querySelector('.logo');
        const loginLink = document.querySelector('a[href*="login.html"]');
        const logoutBtn = document.getElementById('logout-btn');
        const userGreeting = document.getElementById('user-greeting');

        if (user) {
            // User is logged in
            if (logoLink) {
                const currentPath = window.location.pathname;
                const isInLanguagePage = currentPath.includes('/pages/') && currentPath.split('/').length > 3;
                logoLink.href = isInLanguagePage ? '../../pages/dashboard.html' : '../pages/dashboard.html';
            }
            if (loginLink) {
                loginLink.style.display = 'none';
            }
            if (logoutBtn) {
                logoutBtn.style.display = 'block';
            }
            if (userGreeting) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                const userData = userDoc.data();
                userGreeting.textContent = `Hi, ${userData?.username || 'User'}!`;
            }

            // If we're on the index page, redirect to dashboard
            if (window.location.pathname.endsWith('index.html')) {
                window.location.href = '../pages/dashboard.html';
            }
        } else {
            // User is not logged in
            if (logoLink) {
                logoLink.href = '../index.html';
            }
            if (loginLink) {
                loginLink.style.display = 'block';
            }
            if (logoutBtn) {
                logoutBtn.style.display = 'none';
            }
            if (userGreeting) {
                userGreeting.style.display = 'none';
            }

            // If we're on a protected page, redirect to index
            const protectedPages = ['dashboard.html', 'profile.html', 'settings.html'];
            const currentPage = window.location.pathname.split('/').pop();
            
            if (protectedPages.includes(currentPage)) {
                window.location.href = '../index.html';
            }
        }
    });

    // Setup logout button if it exists
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await signOut(auth);
                window.location.href = '../index.html';
            } catch (error) {
                console.error('Error signing out:', error);
            }
        });
    }

    // Setup profile button if it exists
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            // Get the current path and determine the correct relative path to profile.html
            const currentPath = window.location.pathname;
            const isInLanguagePage = currentPath.includes('/pages/') && currentPath.split('/').length > 3;
            const relativePath = isInLanguagePage ? '../../pages/profile.html' : '../pages/profile.html';
            window.location.href = relativePath;
        });
    }
} 