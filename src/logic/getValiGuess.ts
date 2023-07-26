import { colorToChar } from "../utils/colorToChar";
import { noEmptyCellsInArr } from "../utils/isValidGuess";

export const getValidGuess = (
    arr: string[],
    usedLetters: string[],
    usedColors: string[]
  ) => {
    //check that the guess is valid
    if (!noEmptyCellsInArr(arr)) {
      return;
    }
    let guessAsChars = "";
    //build the guess as string
    arr.forEach((color) => {
      guessAsChars += colorToChar(color, usedLetters, usedColors);
    });
    return guessAsChars;
  };