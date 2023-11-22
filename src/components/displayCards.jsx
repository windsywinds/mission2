import React, { useState, useEffect } from "react";
import carDb from "../data/carDb.cjs";
import findCarType from "./services/findCarType";
import findCarColor from "./services/findCarColour";

export const DisplayCards = ({ userImage, data, displayMsg }) => {
  const [displayCardsMsg, setDisplayCardsMsg] = useState();
  useEffect(() => {
    if (data && !data.tagsResult.values.some((item) => item.name === "car")) {
      setDisplayCardsMsg("Sorry, no car found in image, try another?");
    }
  });

  if (!data || !data.tagsResult.values.some((item) => item.name === "car")) {
    return (
      <div>
        {displayCardsMsg ? (
          <div>{displayCardsMsg}</div>
        ) : (
          <div>{displayMsg}</div>
        )}
      </div>
    );
  }

  //define some of our parsed data to varibales before using it
  const imgTitle = data.captionResult.text.split(" ");
  const tagNames = data.tagsResult.values.map((item) => item.name);

  //send our data to some functions to identify the car's type and colour
  const tagCar = findCarType(tagNames);
  const tagColor = findCarColor(tagNames, imgTitle);

  //store the cars details so we can use it to run a match and display
  const inputCar = {
    carImage: userImage,
    carTitle: data.captionResult.text,
    carType: tagCar,
    carColor: tagColor,
  };

  //I want to conditionally render the way carCards are shown in the grid based on how many entries are returned
  const numEntries = carDb?.filter(
    (entry) =>
      entry.carType === inputCar.carType ||
      entry.carColor === inputCar.carColor,
  ).length;
  let gridColumns;
  if (numEntries === 0) {
    gridColumns = "grid-cols-1 w-1/3 ";
  } else if (numEntries === 1) {
    gridColumns = "grid-cols-2 w-1/2 ";
  } else if (numEntries === 2) {
    gridColumns = "sm:grid-cols-3 w-2/3";
  } else {
    gridColumns = "lg:grid-cols-4 w-3/4";
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center ">
      {data && userImage ? (
        <div className={`grid ${gridColumns}  gap-4 pb-12`}>
          <CarCard inputCar={inputCar} />
          {carDb
            ?.filter(
              (entry) =>
                entry.carType === inputCar.carType ||
                entry.carColor === inputCar.carColor,
            )
            .map((entry) => (
              <MatchCard
                key={entry.imgUrl}
                imgUrl={entry.imgUrl}
                carType={entry.carType}
                carColor={entry.carColor}
                carBrand={entry.carBrand}
                carPrice={entry.carPrice}
                inputCar={inputCar}
              />
            ))}
        </div>
      ) : (
        <div>{displayMsg}</div>
      )}
    </div>
  );
};

export const CarCard = ({ inputCar }) => {
  return (
    <div className="flex bg-slate-200 rounded-xl text-slate-900 overflow-hidden border-2 border-slate-800 drop-shadow-[0_15px_15px_rgba(0,0,0,0.85)]">
      {inputCar.carImage && inputCar && (
        <section className="flex flex-col px-4 py-4 ">
          <img
            src={inputCar.carImage}
            alt={inputCar.carTitle}
            className="w-full h-auto object-cover curser-pointer px-4 "
          />
          <p className="text-xl font-semibold">
            {inputCar.carTitle.charAt(0).toUpperCase() +
              inputCar.carTitle.slice(1)}
          </p>
          <ul>
            Body Type:{" "}
            {inputCar.carType.charAt(0).toUpperCase() +
              inputCar.carType.slice(1)}
          </ul>
          <ul>
            Car Colour:{" "}
            {inputCar.carColor.charAt(0).toUpperCase() +
              inputCar.carColor.slice(1)}
          </ul>
          <a href="#" className="text-xs underline mt-auto">
            Tell us more to improve your matches!{" "}
          </a>
        </section>
      )}
    </div>
  );
};

export const MatchCard = ({
  imgUrl,
  carType,
  carColor,
  carBrand,
  inputCar,
  carPrice,
}) => {
  if (!inputCar.carColor || !inputCar.carType) {
    return <div>{displayMsg}</div>;
  }

  return (
    <div className="h-full flex bg-slate-200 rounded-xl text-slate-900  overflow-hidden border-2 border-slate-800 drop-shadow-[0_15px_15px_rgba(0,0,0,0.85)]">
      {imgUrl && (
        <section className="flex flex-col px-4 py-4">
          <img
            src={imgUrl}
            alt={imgUrl}
            className="w-full h-26 object-cover curser-pointer px-4"
          />

          <p className="text-xl font-semibold">
            {carBrand.charAt(0).toUpperCase() + carBrand.slice(1)}
          </p>
          <ul>
            Body Type: {carType.charAt(0).toUpperCase() + carType.slice(1)}
          </ul>
          <ul>
            Colour: {carColor.charAt(0).toUpperCase() + carColor.slice(1)}
          </ul>
          <ul className="font-semibold">
            Price: ${carPrice.charAt(0).toUpperCase() + carPrice.slice(1)}
          </ul>
          <div className="text-xs underline mt-auto">
            {inputCar.carColor === carColor && inputCar.carType === carType ? (
              <div>This car has a similar body and color!</div>
            ) : inputCar.carType === carType ? (
              <div>This car has a similar style!</div>
            ) : inputCar.carColor === carColor ? (
              <div>This car has a similar color!</div>
            ) : null}
          </div>
        </section>
      )}
    </div>
  );
};
