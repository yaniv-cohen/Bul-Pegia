import { COLOR_LIST, LETTER_OPTIONS } from "../../utils/letters";

export const stringToColors = (input: string): string[] => {
  return input.split("").map((char) => {
    return COLOR_LIST[LETTER_OPTIONS.indexOf(char)];
  });
};
