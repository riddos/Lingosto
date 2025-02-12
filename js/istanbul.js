document.addEventListener("DOMContentLoaded", () => {
    // Çeviri Popup
    const triggers = document.querySelectorAll('.translate-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', (event) => {
            event.stopPropagation();
            document.querySelectorAll('.translation-popup').forEach(popup => popup.remove());

            const translation = trigger.getAttribute('data-translation');
            if (translation) {
                let popup = document.createElement('span');
                popup.classList.add('translation-popup');
                popup.textContent = translation;

                const rect = trigger.getBoundingClientRect();
                popup.style.position = 'absolute';
                popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
                popup.style.left = `${rect.left + window.scrollX}px`;
                document.body.appendChild(popup);
            }
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.translation-popup').forEach(popup => popup.remove());
    });

    // Flashcard Click
    const flashcards = document.querySelectorAll('.flashcard');
    flashcards.forEach(flashcard => {
        flashcard.addEventListener('click', () => {
            flashcard.classList.toggle('flip');
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".flashcard")) {
            document.querySelectorAll(".flashcard.flip").forEach(flashcard => {
                flashcard.classList.remove("flip");
            });
        }
    });

    // Menü Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");
    if (menuToggle && menu) {
        menuToggle.addEventListener("click", () => {
            menu.classList.toggle("visible");
        });
    }

    // Flashcard Grupları
    const flashcardGroups = [
        [{ front: "Kedi", back: "Cat" }, { front: "Sokak", back: "Street" }],
        [{ front: "Sanatçı", back: "Artist" }, { front: "Turist", back: "Tourist" }]
    ];
    
    let currentGroupIndex = 0;
    const flashcardsWrapper = document.getElementById("flashcards-wrapper");
    if (flashcardsWrapper) {
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

        const prevDeck = document.getElementById("prevDeck");
        const nextDeck = document.getElementById("nextDeck");

        if (prevDeck && nextDeck) {
            prevDeck.addEventListener("click", () => {
                currentGroupIndex = (currentGroupIndex - 1 + flashcardGroups.length) % flashcardGroups.length;
                updateFlashcards();
            });

            nextDeck.addEventListener("click", () => {
                currentGroupIndex = (currentGroupIndex + 1) % flashcardGroups.length;
                updateFlashcards();
            });

            updateFlashcards();
        }
    }

    // Test ve Quiz Butonları
    const testButton = document.getElementById('testButton');
    const answersButton = document.getElementById('answersButton');
    const flashcardsContainer = document.querySelector('.flashcards-container');
    const imageSection = document.querySelector('.image-section');
    const textSection = document.querySelector('.text-section');
    const dividers = document.querySelectorAll('.divider');
    const quizSection = document.getElementById('quiz-section');

    if (testButton && quizSection) {
        testButton.addEventListener('click', () => {
            flashcardsContainer?.classList.add('fade-out');
            imageSection?.classList.add('fade-out');
            textSection?.classList.add('fade-out');
            dividers.forEach(divider => divider.classList.add('fade-out'));

            setTimeout(() => {
                flashcardsContainer?.classList.add('hidden');
                imageSection?.classList.add('hidden');
                textSection?.classList.add('hidden');
                dividers.forEach(divider => divider.classList.add('hidden'));
            }, 1000);

            quizSection.classList.remove('hidden');
            quizSection.style.display = "block";
        });
    }

    if (answersButton) {
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
            document.getElementById("result")?.textContent = `Success rate: ${successRate.toFixed(0)}%`;
        });
    }
});
