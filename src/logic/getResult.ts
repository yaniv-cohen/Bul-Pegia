import { Result } from "../types/historyTypes";
import { inArray } from "../utils/inArray";

export const getResult = (word1: string[], word2: string[]): Result => {
  let outputBlack = 0;
  word1.forEach((char, i) => {
    if (char === word2[i]) {
      outputBlack++;
    }
  });
  let outputWhite = 0;
  const checked = [""];
  word1.forEach((char) => {
    if (checked.indexOf(char) === -1) {
      outputWhite += Math.min(inArray(word1, char), inArray(word2, char));
      checked.push(char);
    }
  });
  return { black: outputBlack, white: outputWhite - outputBlack };
};
