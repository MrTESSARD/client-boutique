export const nextDaydelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 2);
  return date.toLocaleString();
};

export const scrollToTop = () => {
  return new Promise((resolve) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    resolve();
  });
};
