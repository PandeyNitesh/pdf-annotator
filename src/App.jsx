import React, { useState } from "react";
import PDFViewer from "./components/PDFViewer";
import RightPane from "./components/RightPane";
import examplePdf from "./assets/example.pdf";
import "./App.css";

const App = () => {
  const [isNextScreen, setIsNextScreen] = useState(false);
  const [downloadClick, setDownloadClick] = useState(false);

  const handleNextScreen = () => {
    setIsNextScreen(true);
  };
  const handleDownloadPDF = () => {
    // Logic to update the PDF with inputs and download it.
    setDownloadClick(true);
  };

  return (
    <div className="main_wrapp">
      <div className="viewer_pdf">
        {!isNextScreen ? (
          <PDFViewer pdfUrl={examplePdf} isSaved={false} />
        ) : (
          <PDFViewer
            pdfUrl={examplePdf}
            isSaved={true}
            downloadClick={downloadClick}
          />
        )}
      </div>
      <div className="right_pan_wrapp">
        {!isNextScreen ? (
          <>
            <RightPane />
            <button onClick={handleNextScreen}>Save and Next</button>
          </>
        ) : (
          <button onClick={handleDownloadPDF}>Download PDF</button>
        )}
      </div>
    </div>
  );
};

export default App;
