function findCarColor(tagNames, imgTitle) {
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
}
export default findCarColor;
