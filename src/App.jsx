import { useState } from "react";
import { DisplayCards } from "./components/displayCards";
import { DisplayInput } from "./components/displayInput";

function App() {
  //We can use setState to define the state of changing variables
  const [data, setData] = useState();
  const [image, setImage] = useState(
    "https://www.toyota.co.nz/globalassets/new-vehicles/camry/2021/camry-zr-axhzr-nm1-axrzr-nm1/clear-cuts/updated-clear-cuts/camry-zr-eclipse.png",
  );
  const [displayMsg, setDisplayMsg] = useState(
    "Let us find your perfect car by entering an image link!",
  ); //set a display message that can be updated

  //Pass these to the children components so that they can be called to update the useStates defined here and passed to other child components
  const updateData = (newData) => {
    setData(newData);
  };
  const updateImage = (newImage) => {
    setImage(newImage);
  };
  const updateDisplayMsg = (newMsg) => {
    setDisplayMsg(newMsg);
  };

  return (
    <div className="bg-[#0b0f51] text-stone-200 min-h-screen w-full font-inter flex flex-col items-center">
      <div className="flex flex-col justify-center">
        <h1 className="flex font-bold text-6xl py-6 drop-shadow-[0_15px_15px_rgba(0,0,0,0.85)] text-transparent bg-clip-text bg-gradient-to-b from-stone-400 to-stone-100">
          Turners Car Recognition Service
        </h1>
      </div>

      <DisplayInput
        updateData={updateData}
        updateImage={updateImage}
        updateDisplayMsg={updateDisplayMsg}
      />

      {/* Start of results area */}
      <DisplayCards userImage={image} data={data} displayMsg={displayMsg} />
    </div>
  );
}

export default App;
