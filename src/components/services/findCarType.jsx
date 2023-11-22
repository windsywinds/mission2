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

  try {
    for (const tag of tagNames) {
      const matchingCar = carTypesFull.find((car) => car === tag);

      if (matchingCar) {
        if (
          matchingCar === "luxury car" ||
          "mid-size car" ||
          "luxury vehicle" ||
          "family car"
        ) {
          const matchingCar = "sedan";
          return matchingCar;
        } else if (matchingCar === "coupe" || "compact") {
          const matchingCar = "hatchback";
          return matchingCar;
        }
        return matchingCar;
      }
    }
    // If no match is found set unknown so we can handle logic based on this
    return "unknown";
  } catch (error) {
    console.error("Error in findCarType:", error);
    return "unknown";
  }
}

export default findCarType;
