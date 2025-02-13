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

    if (!testButton || !answersButton || !testSection || !flashcardsContainer || !imageSection || !textSection || !resultDiv) {
        console.error("Bazı gerekli öğeler bulunamadı. Lütfen HTML'nizi kontrol edin.");
        return;
    }

    testButton.addEventListener('click', () => {
        // Show test and answer section
        testSection.style.display = 'block';
        testSection.classList.remove('fade-out');
        testSection.classList.add('fade-in');
        answersButton.style.display = 'block';
        answersButton.classList.remove('fade-out');
        answersButton.classList.add('fade-in');

        // Hide all other sections
        flashcardsContainer.classList.add('fade-out');
        imageSection.classList.add('fade-out');
        translateTriggers.forEach(trigger => trigger.classList.add('fade-out'));
        dividers.forEach(divider => divider.classList.add('fade-out'));
        textSection.classList.add('fade-out');

        setTimeout(() => {
            flashcardsContainer.style.display = 'none';
            imageSection.style.display = 'none';
            translateTriggers.forEach(trigger => trigger.style.display = 'none');
            dividers.forEach(divider => divider.style.display = 'none');
            textSection.style.display = 'none';
        }, 500);
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

        const successRate = selectedValue === correctAnswer ? 100 : 0;
        resultDiv.textContent += ` ${successRate}% success rate`;

        setTimeout(() => {
            testSection.style.display = 'none';

            // Show the main content again
            flashcardsContainer.style.display = 'block';
            imageSection.style.display = 'block';
            translateTriggers.forEach(trigger => trigger.style.display = 'inline-block');
            dividers.forEach(divider => divider.style.display = 'block');
            textSection.style.display = 'block';

            flashcardsContainer.classList.remove('fade-out');
            imageSection.classList.remove('fade-out');
            translateTriggers.forEach(trigger => trigger.classList.remove('fade-out'));
            dividers.forEach(divider => divider.classList.remove('fade-out'));
            textSection.classList.remove('fade-out');
        }, 2000);
    });
});