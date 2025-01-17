document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.translate-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            const popup = event.target.nextElementSibling;
            if (popup) {
                popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Optional: Close any open popups when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.matches('.translate-trigger')) {
            const openPopups = document.querySelectorAll('.translation-popup');
            openPopups.forEach(popup => (popup.style.display = 'none'));
        }
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
