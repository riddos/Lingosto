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
   document.querySelector('.test-button').addEventListener('click', () => {
            document.querySelector('.flashcards-container').style.display = 'none';
            document.querySelector('.image-section').style.display = 'none';
            document.querySelectorAll('.translate-trigger').forEach(el => el.style.display = 'none');
            document.querySelector('.test-area').style.display = 'block';

            const text = document.querySelector('.text-section p').textContent;
            const words = text.split(/\s+/); // Kelimelere ayır

            const questions = [];
            const selectedIndices = new Set(); // Seçilen kelimelerin indekslerini tut

            while (questions.length < 20) {
                const randomIndex = Math.floor(Math.random() * words.length);
                if (!selectedIndices.has(randomIndex) && words[randomIndex].length > 2) { // 2 harften uzun kelimeler seç
                    selectedIndices.add(randomIndex);
                    questions.push({
                        word: words[randomIndex],
                        options: generateOptions(words[randomIndex], words)
                    });
                }
            }


            const testArea = document.querySelector('.test-area');
            testArea.innerHTML = ''; // Önce temizle

            questions.forEach(question => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');
                questionDiv.textContent = text.replace(question.word, '_____');

                const optionsDiv = document.createElement('div');
                optionsDiv.classList.add('options');

                question.options.forEach(option => {
                    const optionDiv = document.createElement('div');
                    optionDiv.classList.add('option');
                    optionDiv.textContent = option;
                    optionDiv.addEventListener('click', () => {
                      // Tüm seçenekleri temizle ve sadece tıklananı işaretle
                        optionsDiv.parentNode.childNodes.forEach(child => child.classList.remove('correct', 'incorrect'));
                        if (option === question.word) {
                            optionDiv.classList.add('correct');
                        } else {
                            optionDiv.classList.add('incorrect');
                        }
                    });
                    optionsDiv.appendChild(optionDiv);
                });

                questionDiv.appendChild(optionsDiv);
                testArea.appendChild(questionDiv);
            });
        });

        function generateOptions(correctWord, allWords) {
            const options = [correctWord];
            const usedWords = new Set([correctWord]);

            while (options.length < 4) {
                const randomIndex = Math.floor(Math.random() * allWords.length);
                const randomWord = allWords[randomIndex];

                if (!usedWords.has(randomWord) && randomWord.length > 2) {
                    options.push(randomWord);
                    usedWords.add(randomWord);
                }
            }

            return shuffleArray(options); // Karıştır
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        document.querySelector('.answers-button').addEventListener('click', () => {
            let correctCount = 0;
            const questions = document.querySelectorAll('.question');

            questions.forEach(questionDiv => {
                const correctOption = questionDiv.querySelector('.option.correct');
                if (correctOption) {
                    correctCount++;
                }
            });

            const successRate = (correctCount / questions.length) * 100;
            document.querySelector('.result').textContent = `${successRate}% success rate`;
        });
