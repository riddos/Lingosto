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
    const dividers = document.querySelectorAll('.divider');
    const textSection = document.querySelector('.text-section');
    const resultDiv = document.getElementById('result');

    testButton.addEventListener('click', () => {
        // Tüm öğelere fade-out efekti uygula
        flashcardsContainer.classList.add('fade-out');
        imageSection.classList.add('fade-out');
        translateTriggers.forEach(trigger => trigger.classList.add('fade-out'));
        dividers.forEach(divider => divider.classList.add('fade-out'));
        textSection.classList.add('fade-out');

        // Öğeleri tamamen gizle
        setTimeout(() => {
            flashcardsContainer.style.display = 'none';
            imageSection.style.display = 'none';
            translateTriggers.forEach(trigger => trigger.style.display = 'none');
            dividers.forEach(divider => divider.style.display = 'none');
            textSection.style.display = 'none';

            // Test section'ı göster
            testSection.style.display = 'block';
        }, 500); // CSS'deki transition süresiyle eşleşmeli
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

        // Başarı oranını hesapla
        const totalQuestions = 1; // Basitlik için sadece bir soru var
        const correctAnswers = selectedValue === correctAnswer ? 1 : 0;
        const successRate = (correctAnswers / totalQuestions) * 100;
        resultDiv.textContent += ` ${successRate}% success rate`;
    });
});
