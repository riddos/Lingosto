document.addEventListener('DOMContentLoaded', () => {
    // Translation popups
    const triggers = document.querySelectorAll('.translate-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.stopPropagation();
            document.querySelectorAll('.translation-popup').forEach(popup => popup.remove());

            const translation = trigger.getAttribute('data-translation');
            if (translation) {
                const popup = document.createElement('span');
                popup.classList.add('translation-popup');
                popup.textContent = translation;

                const rect = trigger.getBoundingClientRect();
                popup.style.position = 'absolute';
                popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
                popup.style.left = `${rect.left + window.scrollX}px`;
                popup.style.display = 'block';

                document.body.appendChild(popup);
            }
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.translation-popup').forEach(popup => popup.remove());
    });

    // Flashcards flip
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(flashcard => {
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flip');
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const testButton = document.getElementById('testButton');
    const answersButton = document.getElementById('answersButton');
    const testSection = document.getElementById('testSection');
    const flashcardsContainer = document.querySelector('.flashcards-container');
    const imageSection = document.querySelector('.image-section');
    const translateTriggers = document.querySelectorAll('.translate-trigger');
    const resultDiv = document.getElementById('result');

    testButton.addEventListener('click', () => {
        // Hide flashcards, image, and translation triggers
        flashcardsContainer.style.opacity = '0';
        imageSection.style.opacity = '0';
        translateTriggers.forEach(trigger => {
            trigger.style.opacity = '0';
        });

        // Show test section
        testSection.style.display = 'block';

        // Fade out effect
        setTimeout(() => {
            flashcardsContainer.style.display = 'none';
            imageSection.style.display = 'none';
            translateTriggers.forEach(trigger => {
                trigger.style.display = 'none';
            });
        }, 500); // Match this duration with the CSS transition duration
    });

    answersButton.addEventListener('click', () => {
        const select = document.querySelector('.test-select');
        const selectedValue = select.value;
        const correctAnswer = 'eşsiz';

        if (selectedValue === correctAnswer) {
            select.style.backgroundColor = 'lightgreen';
            resultDiv.textContent = 'Correct!';
        } else {
            select.style.backgroundColor = 'lightcoral';
            resultDiv.textContent = 'Incorrect!';
        }

        // Calculate success rate
        const totalQuestions = 1; // For simplicity, we have only one question
        const correctAnswers = selectedValue === correctAnswer ? 1 : 0;
        const successRate = (correctAnswers / totalQuestions) * 100;
        resultDiv.textContent += ` ${successRate}% success rate`;
    });
});
