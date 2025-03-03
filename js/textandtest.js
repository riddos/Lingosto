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

    // Handle "Go Back" button click
    document.getElementById('goBack').addEventListener('click', () => {
        document.getElementById('quizContainer').style.display = 'none';
        const elementsToShow = document.querySelectorAll('.flashcards-container, .divider, .image-section, .translate-trigger');
        elementsToShow.forEach(element => {
            element.style.display = 'block';
            element.classList.remove('fade-out');
        });
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

document.addEventListener("click", (event) => {
    // Eğer tıklanan öğe bir flashcard değilse tüm kartları eski haline getir
    if (!event.target.closest(".flashcard")) {
        document.querySelectorAll(".flashcard.flip").forEach(flashcard => {
            flashcard.classList.remove("flip");
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});
document.getElementById('startTest').addEventListener('click', function() {
    // Get all elements except the navbar, quizContainer, and imageSection
    const elementsToBlur = document.querySelectorAll('body > *:not(header):not(#quizContainer):not(#imageSection)');

    // Toggle the blur class on these elements
    elementsToBlur.forEach(element => {
        element.classList.toggle('blur');
    });

    // Scroll to the quiz container
    document.getElementById('quizContainer').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('startTest').addEventListener('click', function() {
    document.getElementById('quizContainer').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.image-section img').style.filter = 'none'; // Remove blur from image
});

document.getElementById('studyAgain').addEventListener('click', function() {
    location.reload();
});