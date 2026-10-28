export const LETTER_OPTIONS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export const COLOR_LIST = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "brown",
  "grey",
];

export const COLOR_NAMES: Record<string, string> = {
  red: "אדום",
  orange: "כתום",
  yellow: "צהוב",
  green: "ירוק",
  blue: "כחול",
  purple: "סגול",
  brown: "חום",
  grey: "אפור",
};

export const charToColor =(char: string): string =>
  COLOR_LIST[LETTER_OPTIONS.indexOf(char)];

export const charsToColors = (chars: string[]): string[] =>
  chars.map(charToColor);

export const colorToChar = (color: string): string =>
  LETTER_OPTIONS[COLOR_LIST.indexOf(color)];
