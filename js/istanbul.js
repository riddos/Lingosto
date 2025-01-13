// Çeviri baloncukları
const triggers = document.querySelectorAll('.translate-trigger');
let activePopup = null;

triggers.forEach(trigger => {
    trigger.addEventListener('click', (event) => {
        const translation = event.target.dataset.translation;

        if (activePopup) activePopup.remove();

        let popup = document.createElement('div');
        popup.className = 'translation-popup';
        popup.textContent = translation;

        event.target.parentNode.appendChild(popup);
        activePopup = popup;

        popup.style.display = 'block';
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.classList.contains('translate-trigger') && activePopup) {
        activePopup.remove();
        activePopup = null;
    }
});

// Flashcardların dönüşü
const flashcards = document.querySelectorAll('.flashcard');

flashcards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flip');
    });
});
