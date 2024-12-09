import * as pdfjs from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker?url';
import { useEffect, useRef, useState } from 'react';
import { AppShell, AppShellMain, Flex, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { PdfViewer } from './components/PdfViewer/PdfViewer';
import { extractText } from '../services/TextExtractor';
import { GptViewer } from './components/gptVIewer';

export function App() {
  const viewerContainer = useRef<HTMLDivElement>(null);
  const viewer = useRef<HTMLDivElement>(null);
  const [pdfDocument, setPdfDocument] = useState<pdfjs.PDFDocumentProxy>();
  const [url, setUrl] = useState('');
  const [pages, setPages] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [text, setText] = useState<String>();
  

  async function init() {
    const params = new URLSearchParams(window.location.search);
    const getUrl = params.get('url');

    if (!getUrl) return;

    setUrl(getUrl);

    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

    const loadPDF = await pdfjs.getDocument(getUrl).promise;
    setPdfDocument(loadPDF);
    setTotalPages(loadPDF._pdfInfo.numPages);
  }

  useEffect(() => {
    init();
  }, []);

  const nextPage = async () => {
    setPages((pages) => (pages = pages + 1));
    setText(await extractText(url, pages));
  };

  const prevPage = async () => {
    setPages((pages) => (pages = pages - 1));
    setText(await extractText(url, pages));
  };

  return (
    <MantineProvider>
      <AppShell
        padding={0}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center', // Ensures proper alignment for buttons and text
            justifyContent: 'center', // Centers the elements horizontally
            gap: '1rem', // Adds spacing between buttons and the heading
          }}
        >
          <button id="previousPage" onClick={prevPage}>
            Left
          </button>
          <h2>Page Number {pages}</h2>
          <button id="nextPage" onClick={nextPage}>
            Right
          </button>
        </div>



        <div style={{

            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            padding: "18px",
           


        }}>
            

            <AppShell.Main>
                <div>
                {pdfDocument && <PdfViewer pdf={pdfDocument} pageNumber={pages} />}
                </div>
            </AppShell.Main>

            <AppShellMain>
                <GptViewer link="/getResponse" text={text || ''} />
            </AppShellMain>

        </div>
        




      </AppShell>
    </MantineProvider>
  );
}
