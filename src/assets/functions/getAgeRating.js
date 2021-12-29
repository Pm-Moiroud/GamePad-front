export default function getAgeRating(string) {
  if (string === "Mature") {
    return `17+ ${string}`;
  } else if (string === "Teen") {
    return `10+ ${string}`;
  }
}
