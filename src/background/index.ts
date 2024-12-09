chrome.runtime.onMessage.addListener((message, sender, respond) => {
  // Listen for the pdf.
  if (message.type == 'openPdf') {
    chrome.tabs.create({ url: `app/index.html?url=${message.url}` });

    return;
  }

  // Fetch PDF contents.
  if (message.type === 'getPdf') {
    fetch(message.url, {
      mode: 'no-cors',
    }).then((response) => {
      response.arrayBuffer().then((buffer) => {
        respond(buffer);
      });
    });
  }
});
