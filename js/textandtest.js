document.addEventListener('DOMContentLoaded', () => {
    // Handle flashcard flipping
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(flashcard => {
        flashcard.addEventListener('click', (event) => {
            event.stopPropagation();
            flashcard.classList.toggle('flipped');
        });
    });

    // Reset all flashcards when clicking outside
    document.addEventListener('click', () => {
        flashcards.forEach(flashcard => {
            flashcard.classList.remove('flipped');
        });
    });

    // Handle translation triggers
    const triggers = document.querySelectorAll('.translate-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            const translation = trigger.getAttribute('data-translation');
            if (translation) {
                trigger.textContent = translation;
                trigger.classList.add('translated');
            }
        });
    });

    // Handle menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
    document.addEventListener('click', (event) => {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.classList.remove('active');
        }
    });

    // Handle quiz navigation
    document.getElementById('startTest').addEventListener('click', () => {
        document.getElementById('quizContainer').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('studyAgain').addEventListener('click', () => {
        location.reload();
    });
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