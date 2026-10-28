import { countColors } from "./countColors";

/** Put a two-color combination first - a strong opening guess. */
export const prioritizeTwoColorGuess = (all: string[][]): string[][] => {
  const best = all.find((option) => countColors(option) === 2);
  return best ? [best, ...all] : all;
};
