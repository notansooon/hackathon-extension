import * as pdfjs from "pdfjs-dist";
import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker?url";
import { useRef } from "react";
import "@mantine/core/styles.css";
import { AppShell, Button, Group, MantineProvider, Skeleton } from "@mantine/core";

export function App() {
    const canvas = useRef<HTMLCanvasElement>(null);

    async function onClick() {
        const url = 'https://www.subway.com/-/media/USA/Documents/Nutrition/US_Allergen_chart.pdf';

        // The workerSrc property shall be specified.
        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

        const buffer = await chrome.runtime.sendMessage({ type: "getPdf", url: url });

        console.log(buffer);

        // Asynchronous download of PDF
        const loadingTask = pdfjs.getDocument(url);

        loadingTask.promise.then(pdf => {
            console.log('PDF loaded');

            // Fetch the first page
            const pageNumber = 1;

            pdf.getPage(pageNumber).then(page => {
                console.log('Page loaded');

                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                // Prepare canvas using PDF page dimensions
                const canvasElement = canvas.current;

                if (canvasElement) {
                    const context = canvasElement.getContext('2d');

                    canvasElement.height = viewport.height;
                    canvasElement.width = viewport.width;

                    // Render PDF page into canvas context
                    const renderTask = page.render({
                        canvasContext: context!,
                        viewport: viewport,
                    });

                    renderTask.promise.then(() => {
                        console.log('Page rendered');
                    });
                }
            });
        }, reason => {
            // PDF loading error
            console.error(reason);
        });
    }

    return (
        <MantineProvider>
            <AppShell
                padding="md"
            >
                <AppShell.Main>
                    <div>
                        <h1>Hello, world!</h1>
                        
                        <Button onClick={onClick}>
                            Load PDF
                        </Button>

                        <canvas ref={canvas}></canvas>
                    </div>
                </AppShell.Main>
            </AppShell>
        </MantineProvider>
    );
}
