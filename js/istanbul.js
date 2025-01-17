// Translation popups
const triggers = document.querySelectorAll('.translate-trigger');

triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', (event) => {
        const translation = event.target.dataset.translation;

        // Create and display popup
        let popup = document.createElement('div');
        popup.className = 'translation-popup';
        popup.textContent = translation;
        event.target.appendChild(popup);

        popup.style.display = 'block';
    });

    trigger.addEventListener('mouseleave', (event) => {
        const popup = event.target.querySelector('.translation-popup');
        if (popup) popup.remove();
    });
});
    document.addEventListener('DOMContentLoaded', () => {
    const flashcards = document.querySelectorAll('.flashcard');

    flashcards.forEach(flashcard => {
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flip');
        });
    });
});
