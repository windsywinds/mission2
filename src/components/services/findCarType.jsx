function findCarType(tagNames) {
  const carTypesFull = [
    "sedan",
    "suv",
    "coupe",
    "convertible",
    "hatchback",
    "wagon",
    "van",
    "minivan",
    "pickup truck",
    "off road",
    "truck",
    "sports car",
    "compact",
    "family car",
    "crossover",
    "luxury car",
    "luxury vehicle",
    "mid-size car",
  ];

  //This logic should is working but the issue lays with Azure tags not accuratly identifying the correct vehicle type. This would likely need a custom model trained
  let matchingCar = "unknown";
  try {
    for (const tag of tagNames) {
      const foundCar = carTypesFull.find((car) => car === tag);
      if (foundCar) {
        matchingCar = foundCar;
        console.log(matchingCar)
        break;
      }
    }
  } catch (error) {
    console.error("Error in findCarType:", error);
  }
  if (
    matchingCar === "luxury car" ||
    matchingCar === "mid-size car" ||
    matchingCar === "luxury vehicle"
  ) {
    matchingCar = "sedan";
  } else if (matchingCar === "coupe" || matchingCar === "compact") {
    matchingCar = "hatchback";
  } else if (matchingCar === "family car") {
    matchingCar = "wagon";
  }
  return matchingCar;
}

export default findCarType;
