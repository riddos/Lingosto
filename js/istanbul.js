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
            menu.classList.toggle("visible");
        });
    });
  document.addEventListener("DOMContentLoaded", function () {
    const flashcardGroups = [
        [
            { front: "Kedi", back: "Cat" },
            { front: "Sokak", back: "Street" },
            { front: "Deniz", back: "Sea" },
            { front: "Şehir", back: "City" }
        ],
        [
            { front: "İlham", back: "Inspiration" },
            { front: "Sanatçı", back: "Artist" },
            { front: "Turist", back: "Tourist" },
            { front: "Halk", back: "Public" }
        ],
        [
            { front: "Kültür", back: "Culture" },
            { front: "Doku", back: "Texture" },
            { front: "Fotoğraf", back: "Photo" },
            { front: "Yazar", back: "Writer" }
        ],
        [
            { front: "Sevmek", back: "To love" },
            { front: "Yemek", back: "Food" },
            { front: "Ev", back: "House" },
            { front: "Cafe", back: "Cafe" }
        ],
        [
            { front: "Sanat", back: "Art" },
            { front: "Bağlantı", back: "Connection" },
            { front: "Eşsiz", back: "Unique" },
            { front: "Tarih", back: "History" }
        ]
    ];

    let currentGroupIndex = 0;
    const flashcardsWrapper = document.getElementById("flashcards-wrapper");

    function updateFlashcards() {
        flashcardsWrapper.innerHTML = "";
        const group = document.createElement("div");
        group.classList.add("flashcard-group");

        flashcardGroups[currentGroupIndex].forEach(card => {
            const flashcard = document.createElement("div");
            flashcard.classList.add("flashcard");
            flashcard.innerHTML = `<div class="front">${card.front}</div><div class="back">${card.back}</div>`;

            flashcard.addEventListener("click", () => {
                flashcard.classList.toggle("flip");
            });

            group.appendChild(flashcard);
        });

        flashcardsWrapper.appendChild(group);
    }

    document.getElementById("prevDeck").addEventListener("click", () => {
        currentGroupIndex = (currentGroupIndex - 1 + flashcardGroups.length) % flashcardGroups.length;
        updateFlashcards();
    });

    document.getElementById("nextDeck").addEventListener("click", () => {
        currentGroupIndex = (currentGroupIndex + 1) % flashcardGroups.length;
        updateFlashcards();
    });

    updateFlashcards();
});
document.getElementById('testButton').addEventListener('click', function() {
    document.querySelectorAll('.flashcards-container, .image-section, .quiz-text, .divider').forEach(function(element) {
        element.classList.add('fade-out');
    });
    document.querySelector('.answers-section').style.display = 'block';
});
document.getElementById('answersButton').addEventListener('click', function() {
    let correctAnswers = 0;
    document.querySelectorAll('.word-select').forEach(function(select) {
        if (select.value === select.options[0].value) {
            select.style.backgroundColor = 'green';
            correctAnswers++;
        } else {
            select.style.backgroundColor = 'red';
        }
    });
    const successRate = (correctAnswers / 20) * 100;
    document.getElementById('resultMessage').textContent = `${successRate}% success rate`;
});
// JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const testButton = document.getElementById('testButton');
    const flashcardsContainer = document.querySelector('.flashcards-container');
    const imageSection = document.querySelector('.image-section');
    const textSection = document.querySelector('.text-section');
    const dividers = document.querySelectorAll('.divider');
    const quizSection = document.getElementById('quiz-section');
    const answersButton = document.getElementById('answersButton');

    testButton.addEventListener('click', () => {
        // Flashcard'ları, resmi, yazıyı ve divider'ları kaybet
        flashcardsContainer.classList.add('fade-out');
        imageSection.classList.add('fade-out');
        textSection.classList.add('fade-out');
        dividers.forEach(divider => divider.classList.add('fade-out'));

        // Flashcard'ları, resmi, yazıyı ve divider'ları tamamen gizle
        setTimeout(() => {
            flashcardsContainer.classList.add('hidden');
            imageSection.classList.add('hidden');
            textSection.classList.add('hidden');
            dividers.forEach(divider => divider.classList.add('hidden'));
        }, 1000);

        // Quiz bölümünü göster
        quizSection.classList.remove('hidden');
    });

    const correctAnswers = ["eşsiz", "tarihi", "sosyal", "adanmış", "fotoğrafçılara", "ilham"];
    
    answersButton.addEventListener('click', () => {
        const selects = document.querySelectorAll("select");
        let correctCount = 0;
        
        selects.forEach((select, index) => {
            if (select.value === correctAnswers[index]) {
                select.classList.add("correct");
                select.classList.remove("incorrect");
                correctCount++;
            } else {
                select.classList.add("incorrect");
                select.classList.remove("correct");
            }
        });
        
        const successRate = (correctCount / correctAnswers.length) * 100;
        document.getElementById("result").textContent = `Success rate: ${successRate.toFixed(0)}%`;
    });
});
