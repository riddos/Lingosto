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
            button.onclick = () => showTranslation(button, sentence.trim());

            span.appendChild(button);
            paragraph.appendChild(span);
        });

        outputContainer.appendChild(paragraph);

        generateVocabulary(text);
    });
});

function showTranslation(button, sentence) {
    const translation = fakeTranslate(sentence); // Gerçek çeviri yerine sahte çeviri fonksiyonu
    let popup = button.nextElementSibling;

    if (!popup) {
        popup = document.createElement("div");
        popup.classList.add("popup");
        popup.textContent = translation;
        button.parentNode.appendChild(popup);
    }

    popup.style.display = popup.style.display === "block" ? "none" : "block";
}

function fakeTranslate(sentence) {
    return sentence.split(" ").reverse().join(" "); // Basit demo çeviri (kelimeleri ters çeviriyor)
}

function generateVocabulary(text) {
    const words = text.toLowerCase().match(/\b[a-zğüşöçıİĞÜŞÖÇ]+\b/gi) || [];
    const uniqueWords = [...new Set(words)];
    const selectedWords = uniqueWords.sort(() => 0.5 - Math.random()).slice(0, 20);

    selectedWords.forEach(word => {
        const li = document.createElement("li");
        li.textContent = `${word} - (ENG) ${word.toUpperCase()}`;
        wordList.appendChild(li);
    });
}
