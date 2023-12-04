export const clsx = (...classNames: (string | undefined)[]): string => {
  const classesList = [...classNames].filter((item) => item);

  return classesList.join(' ');
};
