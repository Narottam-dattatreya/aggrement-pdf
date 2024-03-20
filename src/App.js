import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import "./App.css";
import "./signCanvas.css";
import generatePDF from 'react-to-pdf';

function App() {
  const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

  const sigCanvas = useRef({});
  const targetRef = useRef();

  /* a function that uses the canvas ref to clear the canvas 
  via a method given by react-signature-canvas */
  const clear = () => sigCanvas.current.clear();

  /* a function that uses the canvas ref to trim the canvas 
  from white spaces via a method given by react-signature-canvas
  then saves it in our state */
  const save = () =>
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

  return (
    <div className="App">
      <h1>Signature Pad Example</h1>
      <Popup
        modal
        trigger={<button>Open Signature Pad</button>}
        closeOnDocumentClick={false}
      >
        {close => (
          <div style={{display: 'flex', border: '2px solid black', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas"
              }}
            />
           <div style={{display: 'flex'}}>
           <button onClick={save}>Save</button>
            <button onClick={clear}>Clear</button>
            <button onClick={close}>Close</button>
           </div>
            
          </div>
        )}
      </Popup>
      <br />
      <br />
      <button onClick={() => generatePDF(targetRef, {filename: 'agreement.pdf'})}>Download PDF</button>
      {/* if our we have a non-null image url we should 
      show an image and pass our imageURL state to it*/}
      <div ref={targetRef}>
        <div> THIS MEMORANDUM OF UNDERSTANDING is made, entered into and executed at Mumbai on this 20 day of March , 2024 between Everest Fleet Pvt Ltd., a private limited company incorporated under the provisions of the Companies Act, 2013 and having its office address at F-R-4, 4th Floor, Korum Mall, Eastern Express Highway, Samata Nagar, Thane West, Thane 400606 referred to as “Everest” (which expression shall unless it be repugnant to the context or meaning thereof shall mean and include its successors and assignees) of the ONE PART;</div>
            {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px"
          }}
        />
      ) : null}
         </div>
    
    </div>
  );
}

export default App;
