import { getResult } from "./getResult";

let maxZeroes = -1;
export const chooseBest = (options: string[][]): [number, string[]] => {
  let outputIndex = 0;
  let maxBlacksOutput = 0;
  options.forEach((option, index) => {
    let zeros = 0;
    let blacksTotal = 0;
    options.forEach((otherOption) => {
      const { black, white } = getResult(option, otherOption);
      if (black !== 0) {
        blacksTotal++; // +=blacks
      }
      if (black === 0 && white === 0) {
        zeros++;
      }
    });
    if (maxZeroes < zeros) {
      maxZeroes = zeros;
    }
    if (maxBlacksOutput < blacksTotal) {
      maxBlacksOutput = blacksTotal;
      outputIndex = index;
    }
  });
  // return [
  //   options[outputIndex],
  //   ...options.slice(0, outputIndex),
  //   ...options.slice(outputIndex),
  // ];
  const result = options[outputIndex];
  return [outputIndex, result];
};
