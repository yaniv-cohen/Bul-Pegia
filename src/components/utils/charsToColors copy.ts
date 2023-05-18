import { COLOR_LIST, LETTER_OPTIONS } from "../../utils/letters";

export const charsToColors = (input: string[]): string[] => {
  return input.map((char) => {
    return COLOR_LIST[LETTER_OPTIONS.indexOf(char)];
  });
};
