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
                        window.location.href = '../index.html';
                    }).catch((error) => {
                        console.error('Error signing out:', error);
                    });
                });
            }
        } else {
            // User is signed out
            window.location.href = 'login.html';
        }
    });
});

async function loadLanguageProgress(userId) {
    const progressContainer = document.getElementById('language-progress');
    const userProgressRef = doc(db, "users", userId);
    const userProgressDoc = await getDoc(userProgressRef);
    const userProgress = userProgressDoc.data()?.progress || {};
    const completedStories = userProgressDoc.data()?.completedStories || {};

    languages.forEach(language => {
        const completedStoriesForLang = completedStories[language.code] || [];
        const totalStories = 30; // Total number of stories for each language
        const progress = Math.round((completedStoriesForLang.length / totalStories) * 100);
        
        const progressCard = createProgressCard(language, progress, completedStoriesForLang.length);
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