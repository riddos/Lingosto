document.addEventListener('DOMContentLoaded', () => {
    // Shuffle flashcards to avoid positional guessing
    const flashcardsGrid = document.querySelector('.flashcards-grid');
    if (flashcardsGrid) {
        const cards = Array.from(flashcardsGrid.children);
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        // Re-append in shuffled order
        cards.forEach(card => flashcardsGrid.appendChild(card));
    }

    // Randomize quiz option order where data-correct is present
    const quizSelects = document.querySelectorAll('#quizContainer select');
    quizSelects.forEach(select => {
        const correct = select.getAttribute('data-correct');
        if (!correct) return; // skip pages without data-correct (fallback remains)

        // Preserve the first empty option
        const options = Array.from(select.options).filter(opt => opt.value !== '');
        // Shuffle options using Fisher-Yates
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        // Clear and re-add empty option + shuffled
        select.innerHTML = '';
        const empty = document.createElement('option');
        empty.value = '';
        select.appendChild(empty);
        options.forEach(opt => select.appendChild(opt));
    });
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

    // Handle individual word translations
    const words = document.querySelectorAll('.word-translate');
    words.forEach(word => {
        word.addEventListener('click', (event) => {
            event.stopPropagation();

            // Remove existing underlines and translation boxes
            document.querySelectorAll('.word-translate').forEach(w => w.style.textDecoration = 'none');
            const existingTranslationBox = document.querySelector('.word-translation-box');
            if (existingTranslationBox) {
                existingTranslationBox.remove();
            }

            // Underline the clicked word
            word.style.textDecoration = 'underline';

            // Create and display the translation box
            const translation = word.getAttribute('data-translation');
            const translationBox = document.createElement('div');
            translationBox.className = 'word-translation-box';
            translationBox.textContent = translation;

            // Position the translation box below the word
            const rect = word.getBoundingClientRect();
            translationBox.style.position = 'absolute';
            translationBox.style.left = `${rect.left + window.scrollX}px`;
            translationBox.style.top = `${rect.bottom + window.scrollY + 5}px`;
            translationBox.style.background = '#fff';
            translationBox.style.border = '1px solid #ddd';
            translationBox.style.borderRadius = '5px';
            translationBox.style.padding = '5px 10px';
            translationBox.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
            translationBox.style.zIndex = '9999';

            document.body.appendChild(translationBox);

            // Remove the translation box when clicking outside
            const dismissTranslation = (event) => {
                if (!translationBox.contains(event.target) && !word.contains(event.target)) {
                    translationBox.remove();
                    word.style.textDecoration = 'none';
                    document.removeEventListener('click', dismissTranslation);
                }
            };
            setTimeout(() => {
                document.addEventListener('click', dismissTranslation);
            }, 100);
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

    // Handle startTest button - scroll to quiz section
    const startTestBtn = document.getElementById('startTest');
    if (startTestBtn) {
        startTestBtn.addEventListener('click', function() {
            // Scroll to quiz section
            const quizContainer = document.getElementById('quizContainer');
            if (quizContainer) {
                quizContainer.scrollIntoView({ behavior: 'smooth' });
            }

            // Apply blur to study content (text + video + flashcards) when starting test
            const textSection = document.querySelector('.text-section');
            const videoSection = document.getElementById('videoSection');
            const flashcardsContainer = document.querySelector('.flashcards-container');
            [textSection, videoSection, flashcardsContainer].forEach(el => {
                if (el) el.classList.add('blurred');
            });
        });
    }

    // Handle studyAgain button - scroll to text section
    const studyAgainBtn = document.getElementById('studyAgain');
    if (studyAgainBtn) {
        studyAgainBtn.addEventListener('click', function() {
            // Scroll smoothly to the text section
            const textSection = document.querySelector('.text-section');
            if (textSection) {
                textSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        studyAgainBtn.addEventListener('click', function() {
            // Scroll smoothly to the video section
            const videoSection = document.getElementById('videoSection');
            if (videoSection) {
                videoSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        studyAgainBtn.addEventListener('click', function() {
            // Remove blur to allow studying again
            const textSection = document.querySelector('.text-section');
            const videoSection = document.getElementById('videoSection');
            const flashcardsContainer = document.querySelector('.flashcards-container');
            [textSection, videoSection, flashcardsContainer].forEach(el => {
                if (el) el.classList.remove('blurred');
            });
        });
    }

    // Handle checkAnswers button
    const checkAnswersBtn = document.getElementById('checkAnswers');
    if (checkAnswersBtn) {
        checkAnswersBtn.addEventListener('click', function() {
            // If data-correct attributes exist, derive answers dynamically
            const selects = document.querySelectorAll('#quizContainer select[data-correct]');
            if (selects.length > 0) {
                const correctAnswers = {};
                selects.forEach(sel => {
                    const id = sel.id;
                    const correct = sel.getAttribute('data-correct');
                    if (id) correctAnswers[id] = correct;
                });
                calculateQuizResult(correctAnswers);
                return;
            }

            // Fallback for existing Italian pages
            const correctAnswers = {
                q1: 'nata',
                q2: 'felice',
                q3: 'pagare',
                q4: 'sconosciuto',
                q5: 'sospeso',
                q6: 'pagato',
                q7: 'difficoltà',
                q8: 'chiederlo',
                q9: 'gratuitamente',
                q10: 'solidarietà',
                q11: 'diffusa',
                q12: 'paesi',
                q13: 'speranza',
                q14: 'sorriso',
                q15: 'provare',
                q16: 'lasciare'
            };
            calculateQuizResult(correctAnswers);
        });
    }

});

/**
 * Reusable function to calculate quiz results.
 * @param {Object} correctAnswers - An object containing the correct answers for the quiz.
 */
function calculateQuizResult(correctAnswers) {
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    for (let i = 1; i <= totalQuestions; i++) {
        const userAnswer = document.getElementById(`q${i}`).value;
        if (userAnswer === correctAnswers[`q${i}`]) {
            score++;
        }
    }
    const successRate = ((score / totalQuestions) * 100).toFixed(2);
    const resultText = `Success rate: ${successRate}%`;
    const result = document.getElementById('result');
    result.innerHTML = resultText;
    result.style.textAlign = 'center';
}