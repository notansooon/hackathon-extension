import * as pdfjs from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import { useEffect, useRef, useState } from "react";
import { AppShell, Flex, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { PdfViewer } from "./components/PdfViewer/PdfViewer";

export function App() {
    const viewerContainer = useRef<HTMLDivElement>(null);
    const viewer = useRef<HTMLDivElement>(null);
    const [pdfDocument, setPdfDocument] = useState<pdfjs.PDFDocumentProxy>();

    const [pages, setPages] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
     


    async function init() {
        const params = new URLSearchParams(window.location.search);
        const url = params.get("url");

        if (!url) return;

        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

        const loadPDF = await pdfjs.getDocument(url).promise;
        setPdfDocument(loadPDF);
        setTotalPages(loadPDF._pdfInfo.numPages);

    }

    useEffect(() => {
        init();
    }, []);


    const nextPage = () => {
        setPages((pages) => ( pages = pages + 1 ))
    }

    const prevPage = () => {
        setPages((pages) => ( pages = pages - 1 ))
    }



    return (
        <MantineProvider>
            <AppShell
                padding={0}
                style={{
                    position: "relative", 
                    width: "100%",
                    height: "100vh",
                  }}
            >
                <div
                    style={{
                        display: "flex",
                        flex: "inline"

                    }}
                >
                    <button id="previousPage" onClick={prevPage}> Left </button>
                    <h2>Page Number {pages}</h2>
                    <button id="nextPage" onClick={nextPage}> Right</button>

                </div>
                
                <AppShell.Main>
                <div >
                    {pdfDocument && <PdfViewer pdf={pdfDocument} pageNumber={pages} />}
                </div>
                

                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}
