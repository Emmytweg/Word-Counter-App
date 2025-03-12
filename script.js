const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const charCountNoSpaces = document.getElementById("charCountNoSpaces");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

textInput.addEventListener("input", updateCounts);
copyBtn.addEventListener("click", copyToClipboard);
clearBtn.addEventListener("click", clearText);

function updateCounts() {
    let text = textInput.value.trim();

    // Word count
    let words = text.split(/\s+/).filter(word => word.length > 0);
    wordCount.textContent = words.length;

    // Character count (with spaces)
    charCount.textContent = text.length;

    // Character count (without spaces)
    charCountNoSpaces.textContent = text.replace(/\s+/g, "").length;
}

function copyToClipboard() {
    if (textInput.value.length > 0) {
        navigator.clipboard.writeText(textInput.value);
        alert("Text copied to clipboard!");
    } else {
        alert("No text to copy!");
    }
}

function clearText() {
    textInput.value = "";
    updateCounts();
}