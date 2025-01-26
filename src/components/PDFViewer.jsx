import React, { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import { useInputContext } from "../provider/inputContext";

pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

const PDFViewer = ({ pdfUrl, isSaved, downloadClick }) => {
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [pageHeight, setPageHeight] = useState(0);
  const [scale, setScale] = useState(0.88); // Scale factor for rendering PDF
  const { inputs, setInputs } = useInputContext();

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjs.getDocument(pdfUrl);
      const pdfDocument = await loadingTask.promise;
      setPdf(pdfDocument);
      renderPage(pdfDocument, 1);
    };
    loadPdf();
  }, [pdfUrl]);

  const renderPage = async (pdfDocument, pageNumber) => {
    const page = await pdfDocument.getPage(pageNumber);
    const viewport = page.getViewport({ scale });

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    setPageHeight(viewport.height);

    const renderContext = {
      canvasContext: context,
      viewport,
    };
    await page.render(renderContext).promise;
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedText = e.dataTransfer.getData("text/plain");
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setInputs([...inputs, { text: droppedText, x, y }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e, index) => {
    const { innerText } = e.target;
    const updatedInputs = [...inputs];
    updatedInputs[index].text = innerText;
  };

  const handleDownloadPDF = async () => {
    if (!pdf) return;

    // Fetch the original PDF and load it into pdf-lib
    const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the first page to draw inputs
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    // Adjust for the scale of rendering
    inputs.forEach((input) => {
      firstPage.drawText(input.text, {
        x: input.x / scale, // Adjust the X-coordinate to match the scaling
        y: (pageHeight - input.y) / scale, // Correct Y-axis inversion (adjust the Y to be flipped)
        size: 12,
        color: rgb(0, 0, 0),
      });
    });

    // Save and download the updated PDF
    const updatedPdfBytes = await pdfDoc.save();
    const blob = new Blob([updatedPdfBytes], { type: "application/pdf" });
    saveAs(blob, "updated-document.pdf");
    window.location.reload();
  };

  useEffect(() => {
    if (downloadClick === true) {
      handleDownloadPDF();
    }
  }, [downloadClick]);

  return (
    <div
      style={{ position: "relative" }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <canvas ref={canvasRef} />
      {inputs.map((input, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${input.y}px`,
            left: `${input.x}px`,
            backgroundColor: "white",
            padding: "2px",
            color: "black",
            border: "1px solid black",
            whiteSpace: "pre-wrap",
            textAlign: "left",
          }}
          contentEditable={!isSaved}
          suppressContentEditableWarning
          onInput={(e) => handleInputChange(e, index)}
          dir="ltr"
        >
          {input.text}
        </div>
      ))}
    </div>
  );
};

export default PDFViewer;
