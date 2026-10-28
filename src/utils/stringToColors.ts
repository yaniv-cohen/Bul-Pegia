import { COLOR_LIST, LETTER_OPTIONS } from "./letters";

export const charToColor = (char: string): string => {
  return COLOR_LIST[LETTER_OPTIONS.indexOf(char)];
};
