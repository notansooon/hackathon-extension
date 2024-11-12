if (window.location.href.includes("pdf")) {
    chrome.runtime.sendMessage("pdfDetected");
}