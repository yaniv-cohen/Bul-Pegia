export const colorToChar = (color: string, usedLetters:string[], usedColors:string[]): string => {
  return usedLetters[usedColors.indexOf(color)];
};
