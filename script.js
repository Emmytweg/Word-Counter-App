const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const charCountNoSpaces = document.getElementById("charCountNoSpaces");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadTxt = document.getElementById("downloadTxt");
const downloadPdf = document.getElementById("downloadPdf");
const themeToggle = document.getElementById("themeToggle");

textInput.addEventListener("input", updateCounts);
copyBtn.addEventListener("click", copyToClipboard);
clearBtn.addEventListener("click", clearText);
downloadTxt.addEventListener("click", downloadAsTxt);
downloadPdf.addEventListener("click", downloadAsPdf);
themeToggle.addEventListener("click", toggleTheme);

function updateCounts() {
    let text = textInput.value.trim();

    wordCount.textContent = text.split(/\s+/).filter(word => word.length > 0).length;
    charCount.textContent = text.length;
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

function downloadAsTxt() {
    let text = textInput.value;
    if (text.length === 0) {
        alert("No text to download!");
        return;
    }

    let blob = new Blob([text], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "word-counter.txt";
    link.click();
}

function downloadAsPdf() {
    let text = textInput.value;
    if (text.length === 0) {
        alert("No text to download!");
        return;
    }

    let pdf = new jsPDF();
    pdf.text(text, 10, 10);
    pdf.save("word-counter.pdf");
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    document.querySelector("textarea").classList.toggle("dark-mode");

    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// Load saved theme preference
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    document.querySelector(".container").classList.add("dark-mode");
    document.querySelector("textarea").classList.add("dark-mode");
}

// Load jsPDF library for PDF generation
const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
document.body.appendChild(script);
