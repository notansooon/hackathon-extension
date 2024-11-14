import { PassThrough } from "stream";


const React = await import("react");
const ReactDOM = await import("react-dom");

console.log("Chrome Extension loaded on PDF page");
const customButton = document.createElement("button");



customButton.id = "parseButton";
customButton.innerText = "Custom Button";
customButton.style.position = "fixed";
customButton.style.top = "10%";
customButton.style.left = "10px";
customButton.style.color = "blue";
customButton.style.padding = "10px";
document.body.appendChild(customButton);
console.log("Button added to PDF page");


document.getElementById("parseButton")?.addEventListener("click", async () => {

    //import the app
    const { default: App } = await import(".././app/App");

    ReactDOM.render(React.createElement(App),
    document.getElementById("root"))
})