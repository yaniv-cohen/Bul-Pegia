import { countColors } from "./countColors";

export const getNewPermutations = (all: string[][]): string[][] => {
  const best = all.find((option) => {
    if (countColors(option) === 2) {
      return true;
    }
  });

  if (best) {
    all = [best, ...all];
  }
  return all;
};
