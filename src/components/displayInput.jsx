import { useState } from "react";
import getData from "./services/getData";

export const DisplayInput = ({ updateData, updateImage, updateDisplayMsg }) => {
  const [image, setImage] = useState(
    "https://www.toyota.co.nz/globalassets/new-vehicles/camry/2021/camry-zr-axhzr-nm1-axrzr-nm1/clear-cuts/updated-clear-cuts/camry-zr-eclipse.png",
  );
  const [displayMsg, setDisplayMsg] = useState("Enter a url and click run!"); //set a display message that can be updated

  //we  want to ensure we manage the user changing the input field so this will update the image useState
  const handleOnChange = (e) => {
    setImage(e.target.value);
  };

  //when the user clicks the button, we will initiate our call to the API
  //once the data has been fetched, it will setData with the data useState
  const onButtonClick = async (e) => {
    // Prevent default stops the buttons from acting like a default button as we are using it asynchronously
    e.preventDefault();
    updateData(); //clear the data to reset display messages
    //add checks for correct data being sent so we don't waste server queries
    if (
      !image ||
      !(
        image.endsWith(".jpg") ||
        image.endsWith(".jpeg") ||
        image.endsWith(".png") ||
        image.endsWith(".webp")
      )
    ) {
      console.error("There is an error with the image format or url:");
      updateDisplayMsg("Invalid image format or Url!");
    }
    //let the user know something is happening!
    updateDisplayMsg("Loading...");
    updateImage(image); //send the image back to app.jsx so it can be passed to child components for use
    console.log("Click registered and ready to fetch!");
    try {
      const parsedData = await getData(image);
      updateData(parsedData);
      updateDisplayMsg(getDataResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error?, e.g., setDisplayMsg("Error fetching data: " + error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-6 space-y-4 w-1/4 ">
      <input
        className="bg-slate-300 text-black inline-block px-2 py-1 w-full rounded-xl "
        placeholder="Enter image URL"
        value={image}
        onChange={handleOnChange}
      />
      <button
        className="inline-block w-1/3 px-2 py-1 font-semibold bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl drop-shadow-md mt-2 md:mt-0"
        onClick={onButtonClick}
      >
        Run Service
      </button>
    </div>
  );
};
