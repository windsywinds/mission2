import React from "react";
import carDb from "../data/carDb.cjs";

export const DisplayCars = ({ userImage, data, displayMsg }) => {
  if (!data || !data.tagsResult.values.some((item) => item.name === "car")) {
    return <div>{displayMsg}</div>;
  }

  const imgTitle = data.captionResult.text.split(" ");
  const tagNames = data.tagsResult.values.map((item) => item.name);
  const colorList = [
    "white",
    "black",
    "blue",
    "red",
    "green",
    "yellow",
    "silver",
    "gold",
  ];
  const carTypes = [
    "sedan",
    "suv",
    "coupe",
    "convertible",
    "hatchback",
    "wagon",
    "van",
    "minivan",
    "pickup truck",
    "crossover",
    "luxury car",
    "luxury vehicle",
    "mid-size car",
  ];

  const findCarType = (tagNames, carTypes) => {
    try {
      for (const tag of tagNames) {
        const matchingCar = carTypes.find((car) => car === tag);

        if (matchingCar) {
          return matchingCar;
        }
      }
      // If no match is found set unknown so we can handle logic based on this
      return "unknown";
    } catch (error) {
      console.error("Error in findCarType:", error);
      return "unknown";
    }
  };
  const findCarColor = (tagNames, colorList, imgTitle) => {
    try {
      for (const tag of tagNames) {
        const matchingColor = colorList.find((car) => car === tag);
        if (matchingColor) {
          return matchingColor;
        }
      }
      //If no match is found in tagNames, we check imgTitle
      for (const tag of imgTitle) {
        const matchingColorInTitle = colorList.find((car) => car === tag);
        if (matchingColorInTitle) {
          return matchingColorInTitle;
        }
      }
      // If no match is found in both tagNames and imgTitle set unknown so we can handle logic based on this
      return "unknown";
    } catch (error) {
      console.error("Error in findCarColor:", error);
      return "unknown";
    }
  };

  const tagCar = findCarType(tagNames, carTypes);
  const tagColor = findCarColor(tagNames, colorList, imgTitle);
  const inputCar = {
    carType: tagCar,
    carColor: tagColor,
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      {data && userImage ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
          <CarCard
            userImage={userImage}
            userData={data}
            displayMsg={displayMsg}
          />
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

export const CarCard = ({ userImage, userData }) => {
  return (
    <div className="bg-slate-200 rounded-xl text-slate-900 pt-2 overflow-hidden">
      {userImage && userData && (
        <section className="flex flex-col px-4">
          <img
            src={userImage}
            alt={userImage}
            className="w-full h-auto object-cover curser-pointer px-4"
          />

          <p className="text-xl font-semibold">{userData.captionResult.text}</p>
          <ul>
            {userData.tagsResult.values
              .filter((item) => item.confidence > 0.9)
              .map((filteredItem) => (
                <li key={filteredItem.name}>
                  <span>
                    {filteredItem.name} - Confidence level{" "}
                    {parseInt(filteredItem.confidence * 100)}%
                  </span>
                </li>
              ))}
          </ul>
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
}) => {
  if (!inputCar.carColor || !inputCar.carType) {
    return <div>{displayMsg}</div>;
  }

  return (
    <div className="bg-slate-200 rounded-xl text-slate-900  pt-2 overflow-hidden">
      {imgUrl && (
        <section className="flex flex-col px-4">
          <img
            src={imgUrl}
            alt={imgUrl}
            className="w-full h-auto object-cover curser-pointer px-4"
          />

          <p className="text-xl font-semibold">{carBrand}</p>
          <ul>{carType}</ul>
          <ul>{carColor}</ul>
          <ul>{carBrand}</ul>
        </section>
      )}
    </div>
  );
};
