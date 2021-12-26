import moment from "moment";

export default function getFormatDate(number) {
  if (!number) {
    return [
      moment().subtract("month").startOf("month").format().slice(0, 10),
      moment().subtract("month").endOf("month").format().slice(0, 10),
    ];
  } else if (number <= 0) {
    return moment()
      .subtract(Math.abs(number), "month")
      .endOf("month")
      .format()
      .slice(0, 10);
  } else {
    return moment().add(number, "month").endOf("month").format().slice(0, 10);
  }
}
