/** Returns the guess as a string of letters, or undefined if a slot is empty. */
export const getValidGuess = (letters: Array<string | null>): string | undefined => {
  if (!letters.every((letter): letter is string => !!letter)) {
    return;
  }
  return letters.join("");
};
