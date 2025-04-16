document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-btn");
    const textArea = document.getElementById("input-text");
    const outputDiv = document.getElementById("output");
    const flashcardsContainer = document.getElementById("flashcards-container");
    const languageSelect = document.getElementById("language-select");
    let selectedLanguage = "en";
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    languageSelect.addEventListener("change", () => {
        selectedLanguage = languageSelect.value;
    });

    // Boş yere tıklayınca çeviri baloncuklarını kapatma
    document.body.addEventListener("click", (event) => {
        if (!event.target.classList.contains("translate-btn")) {
            document.querySelectorAll(".translation-popup").forEach(popup => popup.style.display = "none");
        }
    });

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('visible');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.menu') && !event.target.closest('.menu-toggle')) {
            menu.classList.remove('visible');
        }
    });

    generateButton.addEventListener("click", async () => {
        const text = textArea.value.trim();
        if (!text) return;

        outputDiv.innerHTML = "";
        flashcardsContainer.innerHTML = "";

        const sentences = text.match(/[^.?!]+[.?!]/g) || [text];

        for (let sentence of sentences) {
            const span = document.createElement("span");
            span.textContent = sentence.trim() + " ";

            const translateBtn = document.createElement("button");
            translateBtn.textContent = "?";
            translateBtn.classList.add("translate-btn");
            translateBtn.style.marginLeft = "5px";
            translateBtn.style.cursor = "pointer";

            const popup = document.createElement("div");
            popup.classList.add("translation-popup");
            popup.style.display = "none";

            translateBtn.addEventListener("click", async (event) => {
                event.stopPropagation();
                popup.style.display = "block";
                popup.style.position = "absolute";
                popup.style.left = `${event.pageX}px`;
                popup.style.top = `${event.pageY + 20}px`;

                if (!popup.textContent) {
                    popup.textContent = "Translating...";
                    popup.textContent = await translateText(sentence.trim(), selectedLanguage);
                }
            });

            span.appendChild(translateBtn);
            outputDiv.appendChild(span);
            outputDiv.appendChild(popup);
        }

        generateFlashcards(text, selectedLanguage);
    });

    function generateFlashcards(text, language) {
        const words = text.split(/\s+/).filter(word => word.length > 3);
        const uniqueWords = [...new Set(words)].slice(0, 20);
        const flashcardBlocks = [];

        for (let i = 0; i < uniqueWords.length; i += 5) {
            const block = document.createElement("div");
            block.classList.add("flashcard-block");

            uniqueWords.slice(i, i + 5).forEach(word => {
                const flashcard = document.createElement("div");
                flashcard.classList.add("flashcard");

                const flashcardInner = document.createElement("div");
                flashcardInner.classList.add("flashcard-inner");

                const flashcardFront = document.createElement("div");
                flashcardFront.classList.add("flashcard-front");
                flashcardFront.textContent = word;

                const flashcardBack = document.createElement("div");
                flashcardBack.classList.add("flashcard-back");

                translateText(word, language).then(translation => {
                    flashcardBack.textContent = translation;
                });

                flashcardInner.appendChild(flashcardFront);
                flashcardInner.appendChild(flashcardBack);
                flashcard.appendChild(flashcardInner);

                flashcard.addEventListener("click", () => {
                    flashcard.classList.toggle("flipped");
                });

                block.appendChild(flashcard);
            });

            flashcardsContainer.appendChild(block);
        }
    }

    // Language selector functionality
    const languageBtn = document.querySelector('.language-btn');
    const languageDropdown = document.querySelector('.language-dropdown');

    // Toggle dropdown when clicking the button
    if (languageBtn) {
        languageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
        });
    }

    // Handle clicks on language options
    const languageLinks = document.querySelectorAll('.language-dropdown a');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.dataset.lang) {
                e.preventDefault();
                languageBtn.textContent = this.dataset.lang.toUpperCase() + ' ▼';
            }
            languageDropdown.classList.remove('show');
        });
    });

    // Close dropdown when clicking anywhere else
    window.addEventListener('click', function(e) {
        if (!languageBtn.contains(e.target)) {
            languageDropdown.classList.remove('show');
        }
    });
});

// Google Translate API
async function translateText(text, targetLanguage) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(text)}`;
    const response = await fetch(url);
    const result = await response.json();
    return result[0][0][0];
}
