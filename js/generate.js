document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const textInput = document.getElementById("textInput");
    const outputContainer = document.getElementById("outputContainer");
    const wordList = document.getElementById("wordList");

    generateBtn.addEventListener("click", async () => {
        const text = textInput.value.trim();
        if (!text) return;

        outputContainer.innerHTML = "";
        wordList.innerHTML = "";

        const sentences = text.match(/[^.!?]+[.!?]/g) || [text];

        const paragraph = document.createElement("p");

        for (const sentence of sentences) {
            const span = document.createElement("span");
            span.classList.add("sentence");
            span.textContent = sentence.trim() + " ";

            const button = document.createElement("button");
            button.textContent = "❓";
            button.onclick = async () => {
                const translation = await translateText(sentence.trim());
                showTranslation(button, translation);
            };

            span.appendChild(button);
            paragraph.appendChild(span);
        }

        outputContainer.appendChild(paragraph);

        generateVocabulary(text);
    });
});

// ✅ **Google Translate kullanarak sayfa içi çeviri yapıyoruz**
async function translateText(text) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result[0].map(item => item[0]).join(""); // Çeviriyi al
    } catch (error) {
        console.error("Çeviri hatası:", error);
        return "Translation error";
    }
}

// ✅ **Çeviri sonucunu gösteren popup**
function showTranslation(button, translation) {
    let popup = button.nextElementSibling;
    if (!popup) {
        popup = document.createElement("div");
        popup.classList.add("popup");
        button.parentNode.appendChild(popup);
    }
    popup.textContent = translation;
    popup.style.display = popup.style.display === "block" ? "none" : "block";
}

// ✅ **Vocabulary (flashcard) bölümü için İngilizce çeviriler ekliyoruz**
async function generateVocabulary(text) {
    const words = text.toLowerCase().match(/\b[a-zğüşöçıİĞÜŞÖÇ]+\b/gi) || [];
    const uniqueWords = [...new Set(words)];
    const selectedWords = uniqueWords.sort(() => 0.5 - Math.random()).slice(0, 20);

    for (const word of selectedWords) {
        const flashcard = document.createElement("div");
        flashcard.classList.add("flashcard");
        flashcard.textContent = word;

        const translation = await translateText(word);

        const translationDiv = document.createElement("div");
        translationDiv.classList.add("translation");
        translationDiv.textContent = translation;

        flashcard.appendChild(translationDiv);
        flashcard.onclick = () => {
            translationDiv.style.display = translationDiv.style.display === "block" ? "none" : "block";
        };

        wordList.appendChild(flashcard);
    }
}
