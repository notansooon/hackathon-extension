import { css } from "goober";

const button = document.createElement("button");

button.innerText = "Open PDF";
button.className = css`
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: blue;
    padding: 10px;
`;

button.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "openPdf", url: window.location.href });
});

document.getElementsByTagName("html")[0]!.appendChild(button);