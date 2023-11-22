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

  let matchingCar = "unknown";
  try {
    for (const tag of tagNames) {
      const foundCar = carTypesFull.find((car) => car === tag);
      if (foundCar) {
        matchingCar = foundCar;
        break;
      }
      if (
        foundCar === "luxury car" ||
        foundCar === "mid-size car" ||
        foundCar === "luxury vehicle" ||
        foundCar === "family car"
      ) {
        matchingCar = "sedan";
      } else if (foundCar === "coupe" || foundCar === "compact") {
        matchingCar = "hatchback";
      }
    }
  } catch (error) {
    console.error("Error in findCarType:", error);
  }
  return matchingCar;
}

export default findCarType;
