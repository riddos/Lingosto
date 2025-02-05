document.addEventListener('DOMContentLoaded', () => {
    // Handle translation popup toggle
    const triggers = document.querySelectorAll('.translate-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent closing immediately after opening

            // Close all other popups
            const openPopups = document.querySelectorAll('.translation-popup');
            openPopups.forEach(popup => popup.remove());

            // Create and show popup
            const translation = trigger.getAttribute('data-translation');
            if (translation) {
                let popup = document.createElement('span');
                popup.classList.add('translation-popup');
                popup.textContent = translation;

                // Position the popup relative to the trigger
                const rect = trigger.getBoundingClientRect();
                popup.style.position = 'absolute';
                popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
                popup.style.left = `${rect.left + window.scrollX}px`;
                popup.style.display = 'block';

                document.body.appendChild(popup);
            }
        });
    });

    // Close all popups when clicking outside
    document.addEventListener('click', () => {
        const openPopups = document.querySelectorAll('.translation-popup');
        openPopups.forEach(popup => popup.remove());
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
    document.addEventListener("DOMContentLoaded", function () {
        const menuToggle = document.querySelector(".menu-toggle");
        const menu = document.querySelector(".menu");

        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("visible");
        });
    });
    document.addEventListener('DOMContentLoaded', function() {
    const flashcards = document.querySelectorAll('.flashcard');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    let currentIndex = 0;

    function showFlashcard(index) {
        flashcards.forEach((flashcard, i) => {
            flashcard.style.display = i === index ? 'block' : 'none';
        });
    }

    leftArrow.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : flashcards.length - 1;
        showFlashcard(currentIndex);
    });

    rightArrow.addEventListener('click', function() {
        currentIndex = (currentIndex < flashcards.length - 1) ? currentIndex + 1 : 0;
        showFlashcard(currentIndex);
    });

    flashcards.forEach(flashcard => {
        flashcard.addEventListener('click', function() {
            flashcard.classList.toggle('flip');
        });
    });

    showFlashcard(currentIndex);
});
