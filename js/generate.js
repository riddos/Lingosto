document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const textInput = document.getElementById("textInput");
    const outputContainer = document.getElementById("outputContainer");
    const wordList = document.getElementById("wordList");

    generateBtn.addEventListener("click", () => {
        const text = textInput.value.trim();
        if (!text) return;

        outputContainer.innerHTML = "";
        wordList.innerHTML = "";

        // Cümleleri nokta, ünlem, soru işareti ile bölme
        const sentences = text.match(/[^.!?]+[.!?]/g) || [text];

        const paragraph = document.createElement("p");
        sentences.forEach(sentence => {
            const span = document.createElement("span");
            span.classList.add("sentence");
            span.textContent = sentence.trim() + " ";

            const button = document.createElement("button");
            button.textContent = "❓";
            button.onclick = () => translateSentence(button, sentence.trim());

            span.appendChild(button);
            paragraph.appendChild(span);
        });

        outputContainer.appendChild(paragraph);

        generateVocabulary(text);
    });
});

function translateSentence(button, sentence) {
    const googleTranslateURL = `https://translate.google.com/?sl=auto&tl=en&text=${encodeURIComponent(sentence)}`;

    let popup = button.nextElementSibling;
    if (!popup) {
        popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `<a href="${googleTranslateURL}" target="_blank">Translate</a>`;
        button.parentNode.appendChild(popup);
    }

    popup.style.display = popup.style.display === "block" ? "none" : "block";
}

function generateVocabulary(text) {
    const words = text.toLowerCase().match(/\b[a-zğüşöçıİĞÜŞÖÇ]+\b/gi) || [];
    const uniqueWords = [...new Set(words)];
    const selectedWords = uniqueWords.sort(() => 0.5 - Math.random()).slice(0, 20);

    selectedWords.forEach(word => {
        const flashcard = document.createElement("div");
        flashcard.classList.add("flashcard");
        flashcard.textContent = word;

        const translationDiv = document.createElement("div");
        translationDiv.classList.add("translation");
        translationDiv.textContent = "ENG: " + word.toUpperCase();

        flashcard.appendChild(translationDiv);
        flashcard.onclick = () => {
            translationDiv.style.display = translationDiv.style.display === "block" ? "none" : "block";
        };

        wordList.appendChild(flashcard);
    });
}
