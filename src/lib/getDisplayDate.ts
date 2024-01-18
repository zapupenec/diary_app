export const getDisplayDate = (
  currentDate: string | number | Date,
  type: 'short' | 'long' = 'short',
  locale: string = 'ru-Ru',
) => {
  const date = new Date(currentDate);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const dateTime = `${year}-${month}-${day}`;

  if (type === 'short') {
    const shortStringDate = date.toLocaleString(locale, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

    return {
      dateTime,
      dateDisplay: `${shortStringDate.slice(0, 1).toUpperCase()}${shortStringDate.slice(1, -1)}`,
    };
  }

  const longStringDate = date.toLocaleString(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return {
    dateTime,
    dateDisplay: `${longStringDate.slice(0, 1).toUpperCase()}${longStringDate.slice(1, -1)}ода`,
  };
};
