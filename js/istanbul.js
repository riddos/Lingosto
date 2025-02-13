document.addEventListener('DOMContentLoaded', () => {
    // *** Öğe Seçimleri ***
    const testButton = document.getElementById('testButton');
    const answersButton = document.getElementById('answersButton');
    const testSection = document.getElementById('testSection');
    const flashcardsContainer = document.querySelector('.flashcards-container');
    const imageSection = document.querySelector('.image-section');
    const translateTriggers = document.querySelectorAll('.translate-trigger');
    const dividers = document.querySelectorAll('.divider');
    const textSection = document.querySelector('.text-section');
    const resultDiv = document.getElementById('result');

    // *** Hata Kontrolü: Tüm Gerekli Öğeler Mevcut mu? ***
    if (!testButton || !answersButton || !testSection || !flashcardsContainer || !imageSection || !textSection || !resultDiv) {
        console.error("Bazı gerekli öğeler bulunamadı. Lütfen HTML'nizi kontrol edin.");
        return;
    }

    // *** Çeviri Pop-up'ları ***
    document.querySelectorAll('.translate-trigger').forEach(trigger => {
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

    // *** Flashcard Ters Çevirme ***
    document.querySelectorAll('.flashcard').forEach(flashcard => {
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flip');
        });
    });

    // *** Mobil Menü Aç/Kapa ***
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // *** Test Başlatma Butonu ***
    testButton.addEventListener('click', () => {
        // Fade-out efekti uygula
        flashcardsContainer.classList.add('fade-out');
        imageSection.classList.add('fade-out');
        translateTriggers.forEach(trigger => trigger.classList.add('fade-out'));
        dividers.forEach(divider => divider.classList.add('fade-out'));
        textSection.classList.add('fade-out');

        // 500ms sonra öğeleri gizle ve test bölümü aç
        setTimeout(() => {
            flashcardsContainer.style.display = 'none';
            imageSection.style.display = 'none';
            translateTriggers.forEach(trigger => trigger.style.display = 'none');
            dividers.forEach(divider => divider.style.display = 'none');
            textSection.style.display = 'none';

            testSection.style.display = 'block';
        }, 500);
    });

    // *** Test Sonucu Değerlendirme ***
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

        // Başarı oranı hesapla
        const successRate = selectedValue === correctAnswer ? 100 : 0;
        resultDiv.textContent += ` ${successRate}% success rate`;

        // Öğeleri geri aç
        setTimeout(() => {
            testSection.style.display = 'none';
            
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
