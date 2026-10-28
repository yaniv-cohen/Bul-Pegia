import { getResult } from "./getResult";

export const chooseBest = (options: string[][]): [number, string[]] => {
  let outputIndex = 0;
  let maxBlacksOutput = 0;
  options.forEach((option, index) => {
    let blacksTotal = 0;
    options.forEach((otherOption) => {
      if (getResult(option, otherOption).black !== 0) {
        blacksTotal++;
      }
    });
    if (maxBlacksOutput < blacksTotal) {
      maxBlacksOutput = blacksTotal;
      outputIndex = index;
    }
  });

  return [outputIndex, options[outputIndex]];
};
