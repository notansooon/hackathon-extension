
// src/components/PdfViewer/PdfViewer.tsx
import React, { useEffect, useRef, useState } from "react";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { EventBus, PDFViewer } from "pdfjs-dist/web/pdf_viewer.mjs";
import "pdfjs-dist/web/pdf_viewer.css"; // Import default styles

interface PdfViewerProps {
  pdf: PDFDocumentProxy;
  pageNumber: number;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ pdf, pageNumber }) => {
  const viewerElement = useRef<HTMLCanvasElement>(null);
  const [page, setPages] = React.useState<PDFPageProxy | null>(null);
  const pdfViewerRef = useRef<PDFViewer | null>(null);

  useEffect(() => {
   
    const renderPages = async () => {
        const fetchPages = await pdf.getPage(pageNumber);
        setPages(fetchPages);

    }

    renderPages();

  }, [pdf, pageNumber]);

  useEffect(() => {

    const render = async () => {
        
        if (!page) return;
        const viewport = page.getViewport({scale: 1.5});

        
        const canvas = viewerElement.current;

        if (!canvas) {
            console.log('Canvas Error')
            return

        }
        
        const context = canvas.getContext('2d');
        console.log(context)

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const content = {

            canvasContext: context,
            viewport: viewport,

        }

        await page.render(content).promise;




            

        
            

        
        

    }

    render();

  }, [pdf, pageNumber])

  return (
    <canvas ref={viewerElement}></canvas>
  );
};
















