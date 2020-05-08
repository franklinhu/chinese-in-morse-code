export const charsPerRow = totalLength => {
  if (totalLength % 6 === 0) {
    return 6;
  }
  if (totalLength % 5 === 0) {
    return 5;
  }
  if (totalLength % 4 === 0) {
    return 4;
  }
  return 6;
};
