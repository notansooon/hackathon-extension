import { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useRef } from "react";
import { EventBus, PDFViewer } from "pdfjs-dist/web/pdf_viewer.mjs";

interface PdfViewerProps {
    pdf: PDFDocumentProxy;
}

export function PdfViewer({ pdf }: PdfViewerProps) {
    const viewerContainer = useRef<HTMLDivElement>(null);
    const viewerElement = useRef<HTMLDivElement>(null);
    const viewer = useRef<PDFViewer>();

    useEffect(() => {
        const container = viewerContainer.current!;
        const eventBus = new EventBus();

        const pdfViewer = new PDFViewer({
            container,
            viewer: viewerElement.current!,
            eventBus,
        });

        pdfViewer.setDocument(pdf);
        pdfViewer.refresh(false);

        viewer.current = pdfViewer;
    }, [document]);

    return (
        <div
            ref={viewerContainer}
            style={{ position: "absolute" }}
        >
            <div ref={viewerElement} />
        </div>
    );
}