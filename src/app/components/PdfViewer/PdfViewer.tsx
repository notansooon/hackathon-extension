import { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useRef } from "react";
import { EventBus, PDFViewer } from "pdfjs-dist/web/pdf_viewer.mjs";

interface PdfViewerProps {
    pdf: PDFDocumentProxy;
}

export function PdfViewer({ pdf }: PdfViewerProps) {
    const viewerContainer = useRef<HTMLDivElement>(null);
    const viewerElement = useRef<HTMLDivElement>(null);
    const pages = useRef();
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
        //pdfViewer.currentScale = 0.75;
        
         
        viewerContainer.current?.querySelectorAll("canvas").forEach((canvas) => {
            canvas.style.width = '30%';  
            canvas.style.height = 'auto'; 
        });

        pdfViewer.refresh(false);
        

        viewer.current = pdfViewer;
    }, [document]);

    return (
        <div
            ref={viewerContainer}
            style={{ 
            
                    position: "absolute",
                    display: "-ms-grid",
                    gridColumn: "1/2",
                    width: "100%",
                    height: "100vh", // Full height for scrolling
                    overflow: "auto", // Allow scrolling for PDF content
                
            }}
        >
            <div 
                ref={viewerElement}
                style={{ 
                    

                }} 
                
                    
                    
            />
        </div>
    );
}