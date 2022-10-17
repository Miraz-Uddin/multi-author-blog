import moment from "moment/moment";

export default function getMonthsList(howMany = 5, isPrevious = true) {
  const initialDate = moment();
  return Array.from({ length: howMany }, (e, i) => {
    let formattedData;
    let value;
    if (isPrevious) {
      const data = moment(initialDate).subtract(i, "months").format("YYYY-MM");
      const month = moment(initialDate).subtract(i, "months").format("MM");
      const year = moment(initialDate).subtract(i, "months").format("YYYY");
      const lastDay = new Date(year, month, 0).getDate();
      formattedData = `${data}-01,${data}-${lastDay}`;
      value = moment(initialDate).subtract(i, "months").format("MMMM YYYY");
    } else {
      const data = moment(initialDate).add(i, "months").format("YYYY-MM");
      const month = moment(initialDate).add(i, "months").format("MM");
      const year = moment(initialDate).add(i, "months").format("YYYY");
      const lastDay = new Date(year, month, 0).getDate();
      formattedData = `${data}-01,${data}-${lastDay}`;
      value = moment(initialDate).add(i, "months").format("MMMM YYYY");
    }
    return { formattedData, value };
  });
}
