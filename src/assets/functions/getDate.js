import moment from "moment";

export default function getDate(number) {
  if (!number) {
    return moment().subtract("month").endOf("month").format("MMMM");
  } else if (number <= 0) {
    return moment()
      .subtract(Math.abs(number), "month")
      .endOf("month")
      .format("MMMM");
  } else {
    return moment().add(number, "month").endOf("month").format("MMMM");
  }
}

//get current month : var monthName = oneDate.format('MMMM');

// get month -2:  moment().subtract(2, "month").endOf("month").format().slice(0, 10),
