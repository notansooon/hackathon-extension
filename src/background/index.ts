console.log("background loaded")

/**
 * 
 
 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type == "pdfDetected") {
        console.log("hello");
        chrome.action.openPopup();
    }
})

*/



/*

chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({ url: "app/index.html" });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getPdf") {
        fetch(message.url, {
            mode: "no-cors",
        })
            .then((response) => {
                response.arrayBuffer().then(buffer => {
                    sendResponse(buffer);
                });
            })
    }
});

*/