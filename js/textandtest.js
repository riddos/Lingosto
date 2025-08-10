document.addEventListener('DOMContentLoaded', () => {
    // Handle flashcard flipping
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(flashcard => {
        flashcard.addEventListener('click', (event) => {
            event.stopPropagation();
            flashcard.classList.toggle('flip');
        });
    });

    // Reset all flashcards when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.flashcard')) {
            flashcards.forEach(flashcard => {
                flashcard.classList.remove('flip');
            });
        }
    });

    // Handle translation triggers
    const triggers = document.querySelectorAll('.translate-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const translation = trigger.getAttribute('data-translation');
            if (translation) {
                // Remove any existing translation box
                const existingBox = document.querySelector('.translation-box');
                if (existingBox) {
                    existingBox.remove();
                }
                
                // Create a styled translation box
                const translationBox = document.createElement('div');
                translationBox.className = 'translation-box';
                translationBox.textContent = translation;
                
                // Make the trigger container relative positioned if it isn't already
                if (getComputedStyle(trigger).position === 'static') {
                    trigger.style.position = 'relative';
                }
                
                // Add the translation box as a child of the trigger first to calculate dimensions
                trigger.appendChild(translationBox);
                
                // Get screen dimensions and box dimensions
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const rect = trigger.getBoundingClientRect();
                const boxWidth = translationBox.offsetWidth;
                const boxHeight = translationBox.offsetHeight;
                
                // Calculate optimal position to stay next to question mark
                let left = 25; // Default: to the right of question mark
                let top = -5; // Default: slightly above question mark
                
                // Check if box goes off right edge when positioned to the right
                if (rect.left + left + boxWidth > screenWidth - 20) {
                    left = -boxWidth - 5; // Position to the left of question mark
                }
                
                // Check if box goes off left edge when positioned to the left
                if (rect.left + left < 20) {
                    left = 25; // Force to the right if left side is also off-screen
                }
                
                // Check if box goes off bottom edge
                if (rect.top + top + boxHeight > screenHeight - 20) {
                    top = -boxHeight - 5; // Position above question mark
                }
                
                // Check if box goes off top edge
                if (rect.top + top < 20) {
                    top = 25; // Position below question mark
                }
                
                // Apply calculated position
                translationBox.style.position = 'absolute';
                translationBox.style.left = left + 'px';
                translationBox.style.top = top + 'px';
                translationBox.style.zIndex = '9999';
                
                // Add click outside listener to dismiss translation
                const dismissTranslation = (event) => {
                    if (!translationBox.contains(event.target) && !trigger.contains(event.target)) {
                        translationBox.remove();
                        document.removeEventListener('click', dismissTranslation);
                    }
                };
                
                // Small delay to prevent immediate dismissal
                setTimeout(() => {
                    document.addEventListener('click', dismissTranslation);
                }, 100);
                
                // Remove the translation box after 10 seconds
                setTimeout(() => {
                    if (translationBox.parentNode) {
                        translationBox.remove();
                        document.removeEventListener('click', dismissTranslation);
                    }
                }, 10000);
            }
        });
    });

    // Handle menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
        document.addEventListener('click', (event) => {
            if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
                menu.classList.remove('active');
            }
        });
    }

    // Handle startTest button - blur everything except quiz
    const startTestBtn = document.getElementById('startTest');
    if (startTestBtn) {
        startTestBtn.addEventListener('click', function() {
            // Add blur to specific sections, excluding quiz
            const sectionsToBlur = [
                'header',
                '.flashcards-container',
                '.main-content',
                '#videoSection',
                '.divider'
            ];
            
            sectionsToBlur.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    element.classList.add('blur');
                });
            });
            
            // Scroll to quiz section
            const quizContainer = document.getElementById('quizContainer');
            if (quizContainer) {
                quizContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Handle studyAgain button - remove blur and scroll to text section
    const studyAgainBtn = document.getElementById('studyAgain');
    if (studyAgainBtn) {
        studyAgainBtn.addEventListener('click', function() {
            // Remove blur from all elements
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => {
                element.classList.remove('blur');
                if (element.style.filter) {
                    element.style.filter = '';
                }
            });
            
            // Also remove blur from body and documentElement
            document.body.classList.remove('blur');
            document.documentElement.classList.remove('blur');
            
            // Scroll smoothly to the text section
            const textSection = document.querySelector('.text-section');
            if (textSection) {
                textSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

/**
 * Reusable function to calculate quiz results.
 * @param {Object} correctAnswers - An object containing the correct answers for the quiz.
 */
function calculateQuizResult(correctAnswers) {
    let score = 0;
    for (let i = 1; i <= 20; i++) {
        const userAnswer = document.getElementById(`q${i}`).value;
        if (userAnswer === correctAnswers[`q${i}`]) {
            score++;
        }
    }
    const resultText = `Success rate: ${(score / 20) * 100}%`;
    const result = document.getElementById('result');
    result.innerHTML = resultText;
    result.style.textAlign = 'center';
}