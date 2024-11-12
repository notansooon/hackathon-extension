if (window.location.href.endsWith("pdf")) {
    chrome.runtime.sendMessage({ type: "pdfDetected" });
}