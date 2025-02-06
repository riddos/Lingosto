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
document.addEventListener("click", (event) => {
    const flashcards = document.querySelectorAll(".flashcard");
    flashcards.forEach(flashcard => {
        flashcard.classList.remove("flip");
    });
});

// Kartların kendisine tıklanmasını, yukarıdaki olayın tetiklenmesini engelle
flashcards.forEach(flashcard => {
    flashcard.addEventListener("click", (event) => {
        event.stopPropagation(); // Kart tıklandığında kapanmayı engelle
        flashcard.classList.toggle("flip");
    });
});
