# PDF Drag-and-Drop Input Tool
Project Description
This project is a React-based application that allows users to interact with a PDF document dynamically. Users can drag text input fields from a right-hand pane and drop them onto the PDF at specific coordinates. The application then saves the state of the inputs and allows users to download the updated PDF with their inputs rendered.

# Features
#### PDF Display: Load and display any PDF file in the UI.
#### Dynamic Input Placement: Drag text input fields from a right-hand pane and drop them onto the desired location on the PDF.
#### Input Saving and Navigation: Save the input positions and values, and navigate to the next screen with the saved state.
#### Input Editing: Modify the content of the input fields directly on the next screen.
#### PDF Download: Export and download the updated PDF with the inputs rendered at their saved coordinates.
#### Reset Workflow: After downloading, reset the application to allow starting over with a new PDF.
# Prerequisites
#### Node.js installed on your system.
#### A GitHub repository to manage version control (optional).
Installation and Setup
## Clone the repository:
##### - git clone [repository-url]
##### - cd [project-directory]
## Install node modules:
##### - npm install
## Run project:
##### - npm run dev

## Folder structure:

#### src/

#### ├── components/

#### │   ├── PDFViewer.jsx      # Handles PDF rendering and input interactions

#### │   ├── RightPane.jsx      # Displays draggable text inputs

#### ├── App.jsx                # Main application logic

#### ├── context/

#### │   ├── InputsContext.jsx  # Context API for managing input state

#### ├── styles.css             # Application styles

#### ├── main.jsx               # Entry point for the React application

How to Use
Step 1: Load a PDF in the application.

The PDF is displayed on the left pane.
Step 2: Drag text input fields from the right pane and drop them onto the desired location on the PDF.

Step 3: Save the inputs and their coordinates by clicking the "Save" button and proceed to the next screen.

Step 4: Review and edit the text inputs on the second screen.

Step 5: Download the updated PDF with the inputs rendered at their saved locations.

Step 6: Reset the application to start again with a new PDF.

Libraries Used
React.js: Frontend framework for building the application.
pdfjs-dist: Library for rendering and displaying PDF files.
pdf-lib: Library for modifying and updating the content of PDF files.
file-saver: Utility for saving files to the user's device.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Special thanks to the open-source community for providing excellent libraries like pdfjs-dist, pdf-lib, and file-saver.
