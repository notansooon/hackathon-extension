import { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useRef } from "react";
import "./PdfViewer.css";
import { EventBus, PDFViewer } from "pdfjs-dist/web/pdf_viewer.mjs";

interface PdfViewerProps {
    document: PDFDocumentProxy;
}

export function PdfViewer({ document }: PdfViewerProps) {
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

        pdfViewer.setDocument(document);
        viewer.current = pdfViewer;
    }, [document]);

    return (
        <div
            ref={viewerContainer}
            style={{ 
                position: "absolute",
                width: "100%",
                height: "100%"
            }}
        >
            <div ref={viewerElement} />
        </div>
    );
}