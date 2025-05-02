import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { firebaseConfig } from './config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to handle navigation based on auth state
export function setupAuthNavigation() {
    onAuthStateChanged(auth, async (user) => {
        try {
            const logoLink = document.querySelector('.logo');
            const loginLink = document.querySelector('a[href*="/en/login.html"]');
            const logoutBtn = document.getElementById('logout-btn');
            const userGreeting = document.getElementById('user-greeting');

            if (user) {
                // User is logged in
                if (logoLink) {
                    const currentPath = window.location.pathname;
                    const isInLanguagePage = currentPath.includes('/en/') && currentPath.split('/').length > 3;
                    logoLink.href = isInLanguagePage ? '../../en/dashboard.html' : '../en/dashboard.html';
                }
                if (loginLink) {
                    loginLink.style.display = 'none';
                }
                if (logoutBtn) {
                    logoutBtn.style.display = 'block';
                }
                if (userGreeting) {
                    try {
                        const userDoc = await getDoc(doc(db, "users", user.uid));
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            userGreeting.textContent = `Hi, ${userData?.username || 'User'}!`;
                        } else {
                            console.warn('User document not found');
                            userGreeting.textContent = 'Hi, User!';
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                        userGreeting.textContent = 'Hi, User!';
                    }
                }

                // If we're on the index page, redirect to dashboard
                if (window.location.pathname.endsWith('index.html')) {
                    window.location.href = '../en/dashboard.html';
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
        } catch (error) {
            console.error('Error in auth state change:', error);
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
                alert('Failed to sign out. Please try again.');
            }
        });
    }

    // Setup profile button if it exists
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            window.location.href = '/en/profile.html';
        });
    }
} 