import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Language code mapping
const languageCodeMap = {
    'turkish': 'tr',
    'english': 'en',
    'german': 'de',
    'french': 'fr',
    'portuguese': 'pt',
    'italian': 'it',
    'spanish': 'es',
    'czech': 'cs',
    'russian': 'ru',
    'dutch': 'nl',
    'swedish': 'sv',
    'norwegian': 'no',
    'croatian': 'hr',
    'polish': 'pl'
};

document.addEventListener('DOMContentLoaded', () => {
    const auth = getAuth();
    const db = getFirestore();
    
    // Get all complete buttons
    const completeButtons = document.querySelectorAll('.complete-btn');
    
    // Initialize buttons based on auth state
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            completeButtons.forEach(button => {
                button.style.display = 'none';
            });
            return;
        }

        // Get user's completed stories from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        const completedStories = userData?.completedStories || {};

        // Get current language from URL and map to language code
        const currentPath = window.location.pathname;
        const languageMatch = currentPath.match(/\/en\/([^\/]+)\//);
        const currentLanguagePath = languageMatch ? languageMatch[1] : null;
        const currentLanguage = currentLanguagePath ? languageCodeMap[currentLanguagePath] : null;

        completeButtons.forEach(button => {
            const storyId = button.dataset.story;
            button.style.display = 'inline-block';
            
            // Set initial state
            if (completedStories[currentLanguage]?.[storyId]) {
                button.classList.add('completed');
                button.textContent = 'Completed';
            }
            
            // Add click event
            button.addEventListener('click', async () => {
                const isCompleted = button.classList.contains('completed');
                
                try {
                    if (isCompleted) {
                        button.classList.remove('completed');
                        button.textContent = 'Mark as Completed';
                        if (completedStories[currentLanguage]) {
                            delete completedStories[currentLanguage][storyId];
                        }
                    } else {
                        button.classList.add('completed');
                        button.textContent = 'Completed';
                        if (!completedStories[currentLanguage]) {
                            completedStories[currentLanguage] = {};
                        }
                        completedStories[currentLanguage][storyId] = true;
                    }
                    
                    // Calculate new progress
                    const completedCount = Object.keys(completedStories[currentLanguage] || {}).length;
                    const totalStories = document.querySelectorAll('.story-list li').length;
                    const newProgress = totalStories > 0 ? Math.round((completedCount / totalStories) * 100) : 0;
                    
                    console.log('Story Completion Debug:', {
                        currentLanguage,
                        completedStories,
                        completedCount,
                        totalStories,
                        newProgress
                    });
                    
                    // Update Firestore with both completedStories and progress
                    await updateDoc(doc(db, "users", user.uid), {
                        completedStories: completedStories,
                        progress: {
                            ...userData?.progress || {},
                            [currentLanguage]: newProgress
                        }
                    });

                    console.log('Firestore update successful');

                    // Also update localStorage for offline support
                    localStorage.setItem('completedStories', JSON.stringify(completedStories));
                } catch (error) {
                    console.error('Error updating story completion:', error);
                    // Revert UI changes if update fails
                    button.classList.toggle('completed');
                    button.textContent = isCompleted ? 'Mark as Completed' : 'Completed';
                }
            });
        });
    });
}); 