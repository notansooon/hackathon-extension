import { useEffect, useState } from 'react';
interface GptViewerProps {
  link: String;
  text: String;
}

export function GptViewer({ link, text }: GptViewerProps) {
  const [response, setResponse] = useState<string>('Loading...');

  async function fetchData() {
    try {
      const getData = await fetch(`http://localhost:3000${link}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputText: `Give an in Depth analysis on what paragraph is about:\n\n ${text} 
            `,
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

  return (
    <>
      <button onClick={fetchData}> Parse Button</button>
      <div style={{ position: 'relative' }}>
        <p>{response}</p>
      </div>
    </>
  );
}
