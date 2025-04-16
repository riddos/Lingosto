import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

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

// Available languages
const languages = [
    { code: 'tr', name: 'Turkish' },
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'cs', name: 'Czech' },
    { code: 'ru', name: 'Russian' },
    { code: 'pl', name: 'Polish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'nl', name: 'Dutch' },
    { code: 'hr', name: 'Croatian' }
];

document.addEventListener("DOMContentLoaded", () => {
    // Add menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click from immediately triggering the document click
            menu.classList.toggle('visible');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
                menu.classList.remove('visible');
            }
        });
    }

    // Handle profile button click
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            // Get the current path and determine the correct relative path to profile.html
            const currentPath = window.location.pathname;
            const isInLanguagePage = currentPath.includes('/en/') && currentPath.split('/').length > 3;
            const relativePath = isInLanguagePage ? '/en/profile.html' : '/en/profile.html';
            window.location.href = relativePath;
        });
    }

    // Handle authentication state
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Get user data from Firestore
            const userDoc = await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            
            // Update profile information
            document.getElementById('profile-username').textContent = userData.username;
            document.getElementById('profile-email').textContent = user.email;
            document.getElementById('profile-join-date').textContent = new Date(userData.createdAt).toLocaleDateString();
            
            // Update greeting
            const greetingElement = document.getElementById('user-greeting');
            if (greetingElement) {
                greetingElement.innerHTML = `Hi, <strong>${userData.username}</strong>!`;
            }

            // Load language progress
            await loadLanguageProgress(user.uid);

            // Add click handler for logout button
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', () => {
                    signOut(auth).then(() => {
                        window.location.href = "../index.html";
                    }).catch((error) => {
                        console.error('Error signing out:', error);
                    });
                });
            }
        } else {
            // User is signed out
            window.location.href = "../../en/login.html";
        }
    });
});

async function loadLanguageProgress(userId) {
    const progressContainer = document.getElementById('language-progress');
    const userProgressRef = doc(db, "users", userId);
    const userProgressDoc = await getDoc(userProgressRef);
    const userData = userProgressDoc.data();
    
    console.log('Profile Debug - Full User Data:', userData);
    const completedStories = userData?.completedStories || {};
    console.log('Profile Debug - Completed Stories:', completedStories);

    // Clear existing progress cards
    progressContainer.innerHTML = '';

    languages.forEach(language => {
        const languageCode = language.code;
        const completedStoriesForLang = completedStories[languageCode] || {};
        
        // Count only the stories that are marked as true (completed)
        const completedCount = Object.values(completedStoriesForLang).filter(v => v === true).length;
        
        // Get total stories from the completedStories object
        const totalStories = Object.keys(completedStoriesForLang).length;
        const languageProgress = totalStories > 0 ? Math.round((completedCount / totalStories) * 100) : 0;
        
        console.log(`Profile Debug - Language ${language.name} (${languageCode}):`, {
            completedStoriesForLang,
            completedCount,
            totalStories,
            languageProgress
        });
        
        const progressCard = createProgressCard(language, languageProgress, completedCount);
        progressContainer.appendChild(progressCard);
    });
}

function createProgressCard(language, progress, completedCount) {
    const card = document.createElement('div');
    card.className = 'progress-card';
    
    card.innerHTML = `
        <h3>${language.name}</h3>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
        <p>${progress}% Complete (${completedCount} stories completed)</p>
    `;

    return card;
}

// Function to update progress (to be called from other pages)
export async function updateLanguageProgress(userId, languageCode, progress) {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const currentProgress = userDoc.data()?.progress || {};
    
    // Only update if the new progress is higher
    if (!currentProgress[languageCode] || progress > currentProgress[languageCode]) {
        await updateDoc(userRef, {
            [`progress.${languageCode}`]: progress
        });
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const db = getFirestore();
    const userId = "currentUserId"; // Replace with logic to get the current user's ID
    const userDocRef = doc(db, "users", userId);

    try {
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();

            // Update username, email, and join date
            document.getElementById("profile-username").textContent = userData.username || "N/A";
            document.getElementById("profile-email").textContent = userData.email || "N/A";
            document.getElementById("profile-join-date").textContent = userData.joinDate || "N/A";

            // Update language progress
            const languageProgress = userData.languageProgress || {};
            const progressContainer = document.getElementById("language-progress");
            progressContainer.innerHTML = ""; // Clear existing content

            Object.entries(languageProgress).forEach(([language, progress]) => {
                const progressCard = document.createElement("div");
                progressCard.classList.add("progress-card");
                progressCard.innerHTML = `
                    <h3>${language}</h3>
                    <p>Stories Completed: ${progress.completedStories || 0}</p>
                `;
                progressContainer.appendChild(progressCard);
            });
        } else {
            console.error("User document does not exist.");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
});