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

    // Handle "Answers" button click
    document.getElementById('checkAnswers').addEventListener('click', () => {
        const correctAnswers = {
            0: 'eşsiz',
            1: 'ünlüdür',
            2: 'tarihi',
            3: 'kedi',
            4: 'kültürel',
            5: 'dokusunun',
            6: 'yerel halk',
            7: 'ilgi',
            8: 'yiyecek',
            9: 'evlerine',
            10: 'adanmış',
            11: 'ilham'
        };
        let score = 0;
        const selects = document.querySelectorAll('#quizContainer select');
        selects.forEach((select, index) => {
            if (select.value === correctAnswers[index]) {
                select.classList.add('correct');
                score++;
            } else {
                select.classList.add('incorrect');
            }
        });
        const result = document.getElementById('result');
        result.textContent = `Success rate: ${(score / selects.length) * 100}%`;
        result.style.textAlign = 'center'; // Center the success rate message
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
document.getElementById('checkAnswers').addEventListener('click', function() {
    const correctAnswers = {
        q1: 'eşsiz',
        q2: 'ünlüdür',
        q3: 'tarihi',
        q4: 'kedi',
        q5: 'kültürel',
        q6: 'dokusunun',
        q7: 'yerel halk',
        q8: 'ilgi',
        q9: 'yiyecek',
        q10: 'evlerine',
        q11: 'adanmış',
        q12: 'ilham'
    };
    let score = 0;
    const userAnswer1 = document.getElementById('q1').value;
    const userAnswer2 = document.getElementById('q2').value;
    const userAnswer3 = document.getElementById('q3').value;
    const userAnswer4 = document.getElementById('q4').value;
    const userAnswer5 = document.getElementById('q5').value;
    const userAnswer6 = document.getElementById('q6').value;
    const userAnswer7 = document.getElementById('q7').value;
    const userAnswer8 = document.getElementById('q8').value;
    const userAnswer9 = document.getElementById('q9').value;
    const userAnswer10 = document.getElementById('q10').value;
    const userAnswer11 = document.getElementById('q11').value;
    const userAnswer12 = document.getElementById('q12').value;
    if (userAnswer1 === correctAnswers.q1) {
        score++;
    }
    if (userAnswer2 === correctAnswers.q2) {
        score++;
    }
    if (userAnswer3 === correctAnswers.q3) {
        score++;
    }
    if (userAnswer4 === correctAnswers.q4) {
        score++;
    }
    if (userAnswer5 === correctAnswers.q5) {
        score++;
    }
    if (userAnswer6 === correctAnswers.q6) {
        score++;
    }
    if (userAnswer7 === correctAnswers.q7) {
        score++;
    }
    if (userAnswer8 === correctAnswers.q8) {
        score++;
    }
    if (userAnswer9 === correctAnswers.q9) {
        score++;
    }
    if (userAnswer10 === correctAnswers.q10) {
        score++;
    }
    if (userAnswer11 === correctAnswers.q11) {
        score++;
    }
    if (userAnswer12 === correctAnswers.q12) {
        score++;
    }
    const resultText = `Success rate: ${(score / 12) * 100}%`;
    const result = document.getElementById('result');
    result.innerHTML = resultText;
    result.style.textAlign = 'center'; // Center the success rate message
});

document.getElementById('startTest').addEventListener('click', function() {
    document.getElementById('quizContainer').scrollIntoView({ behavior: 'smooth' });
    document.querySelector('.image-section img').style.filter = 'none'; // Remove blur from image
});

document.getElementById('studyAgain').addEventListener('click', function() {
    location.reload();
});