import { COLOR_LIST, LETTER_OPTIONS } from "../../utils/letters";

export const stringToColors = (input: string): string[] => {
  return input.split("").map((char) => {
    return charToColor(char);
  });
};
export const charToColor = (char: string): string => {
  return COLOR_LIST[LETTER_OPTIONS.indexOf(char)];
};
