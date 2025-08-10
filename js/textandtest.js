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
                
                // Add to body first to calculate dimensions
                document.body.appendChild(translationBox);
                
                // Get screen dimensions and box dimensions
                const screenWidth = window.innerWidth;
                const screenHeight = window.innerHeight;
                const rect = trigger.getBoundingClientRect();
                const boxWidth = translationBox.offsetWidth;
                const boxHeight = translationBox.offsetHeight;
                
                // Calculate optimal position
                let left = rect.right + 10;
                let top = rect.top;
                
                // Check if box goes off right edge
                if (left + boxWidth > screenWidth - 20) {
                    left = rect.left - boxWidth - 10; // Position to the left of question mark
                }
                
                // Check if box goes off left edge
                if (left < 20) {
                    left = 20; // Minimum left margin
                }
                
                // Check if box goes off bottom edge
                if (top + boxHeight > screenHeight - 20) {
                    top = screenHeight - boxHeight - 20; // Position above bottom edge
                }
                
                // Check if box goes off top edge
                if (top < 20) {
                    top = 20; // Minimum top margin
                }
                
                // Apply calculated position
                translationBox.style.position = 'fixed';
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

    // Handle studyAgain button - remove blur and scroll to top
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
            
            // Scroll to top of the page
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
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