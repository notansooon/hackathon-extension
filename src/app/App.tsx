import * as pdfjs from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import { useEffect, useRef, useState } from "react";
import { AppShell, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { PdfViewer } from "./components/PdfViewer/PdfViewer";

export function App() {
    const viewerContainer = useRef<HTMLDivElement>(null);
    const viewer = useRef<HTMLDivElement>(null);
    const [pdfDocument, setPdfDocument] = useState<pdfjs.PDFDocumentProxy>();

    async function init() {
        const params = new URLSearchParams(window.location.search);
        const url = params.get("url");

        if (!url) return;

        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

        const pdfDocument = await pdfjs.getDocument(url).promise;

        setPdfDocument(pdfDocument);
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <MantineProvider>
            <AppShell
                padding="100px"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr',
                    gap: '20px',
                }}
            >
                <AppShell.Main>
                <div style={{ gridColumn: '1' }}>
                    {pdfDocument && <PdfViewer pdf={pdfDocument} />}
                </div>
                <div style={{ gridColumn: '2', backgroundColor: '#f4f4f4', padding: '20px' }}>
                
                </div>
                
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}
