import { colorToChar } from "../utils/colors";

/** Returns the guess as a string of letters, or undefined if a slot is empty. */
export const getValidGuess = (
  colors: Array<string | null>
): string | undefined => {
  if (!colors.every((color): color is string => !!color)) {
    return;
  }
  return colors.map(colorToChar).join("");
};
