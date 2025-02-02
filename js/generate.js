document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generate-btn");
    const textArea = document.getElementById("input-text");
    const outputDiv = document.getElementById("output");
    const flashcardsContainer = document.getElementById("flashcards-container");

    // Boş yere tıklayınca çeviri baloncuklarını kapatma
    document.body.addEventListener("click", (event) => {
        if (!event.target.classList.contains("translate-btn")) {
            document.querySelectorAll(".translation-popup").forEach(popup => popup.style.display = "none");
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
                    popup.textContent = await translateText(sentence.trim());
                }
            });

            span.appendChild(translateBtn);
            outputDiv.appendChild(span);
            outputDiv.appendChild(popup);
        }

        generateFlashcards(text);
    });

    function generateFlashcards(text) {
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

                translateText(word).then(translation => {
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

            flashcardBlocks.push(block);
        }

        flashcardBlocks.forEach(block => flashcardsContainer.appendChild(block));
    }
});

// Çeviri API (Google veya LibreTranslate Kullanılabilir)
async function translateText(text) {
    const url = "https://libretranslate.com/translate";
    
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: "en",
                format: "text"
            })
        });

        const result = await response.json();
        return result.translatedText || "Translation error";
    } catch (error) {
        console.error("Çeviri hatası:", error);
        return "Translation error";
    }
}
