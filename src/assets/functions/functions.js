import moment from "moment";

export default function handleSearchThirty(type, days) {
  // FORMAT : dates=1960-01-01,1989-12-31
  if (type === "sub" && days) {
    const today = moment().format().slice(0, 10);
    let searchedDate = moment().subtract(days, "days");
    searchedDate = searchedDate.format().slice(0, 10);

    const difference = `${searchedDate},${today}`;
    return difference;
  } else if (type === "add" && days) {
    const today = moment().format().slice(0, 10);
    let searchedDate = moment().add(days, "days");
    searchedDate = searchedDate.format().slice(0, 10);
    const isAfter = moment(`${searchedDate}`).isAfter(today);

    if (isAfter) {
      const difference = `${today},${searchedDate}`;

      return difference;
    } else {
      const difference = `${searchedDate},${today}`;

      return difference;
    }
  }
}
