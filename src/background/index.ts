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