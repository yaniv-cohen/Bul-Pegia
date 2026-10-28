export const countColors = (arr: string[]): number => {
  const colors = new Set();
  for (const letter of arr) {
    if (!colors.has(letter)) {
      colors.add(letter);
    }
  }
  return colors.size;
};
