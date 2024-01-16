export const getDisplayDate = (currentDate: string | number | Date) => {
  const date = new Date(currentDate);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const dateTime = `${year}-${month}-${day}`;

  const dateDisplay = date.toLocaleDateString('ru-RU');

  return { dateTime, dateDisplay };
};
