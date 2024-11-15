import { css } from "goober";

const customButton = document.createElement("button");

customButton.className = css`
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: blue;
    padding: 10px;
`;

customButton.innerHTML = "Open PDF";

customButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "openPdf", url: window.location.href });
});

document.body.appendChild(customButton);