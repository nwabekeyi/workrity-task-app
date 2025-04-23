const useDate = (date: string | undefined): string => {
  if (!date) {
    // Return an empty string or handle the case where date is undefined
    return "";
  }

  const fullDate: Date = new Date(date.replaceAll("-", "/"));
  const year: number = fullDate.getFullYear();
  const month: number = fullDate.getMonth() + 1;
  const day: number = fullDate.getDate();

  const dateFormated: string =
    month.toString().padStart(2, "0") +
    "/" +
    day.toString().padStart(2, "0") +
    "/" +
    year;

  return dateFormated;
};

export default useDate;
