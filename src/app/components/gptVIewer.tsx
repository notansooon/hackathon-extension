import { useEffect, useState } from "react";
interface GptViewerProps {
    link: String;
    text: String;
}



export function GptViewer ({link, text}: GptViewerProps) {

const [response, setResponse] = useState<string>("Loading...");
useEffect(() => {
           async function fetchData() {
                      try {
                      const getData = await fetch(`http://localhost:5173${link}`, {
                      method: "POST",
                      headers: {
                      "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                      inputText: `Please simplify this paragraph:\n\n ${text}`,
                      }),
                      });
           
                      if (!getData.ok) {
                      throw new Error(`HTTP error! status: ${getData.status}`);
                      }
           
                      const result = await getData.text();
                      setResponse(result);
                      } catch (error: any) {
                      setResponse(`Error: ${error.message}`);
                      }
           }
           
           fetchData();
           }, [link, text]);
           
           return (
           <div style={{ position: "relative" }}>
                      <p>{response}</p>
           </div>
           );
}




