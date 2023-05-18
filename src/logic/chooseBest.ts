import { getResult } from "./getResult";

let maxZeros = -1;
export const chooseBest = (options: string[][]): string[][] => {
  console.log(options[0]);
  let outputIndex = 0;
  options.forEach((option, index) => {
    let zeros = 0;
    options.forEach((otherOption) => {
      const { black, white } = getResult(option, otherOption);
      if (black === 0 && white === 0) zeros++;
      if (maxZeros < zeros) {
        outputIndex = index;
        maxZeros = zeros;
      }
    });
  });
  
  return [
    // options[outputIndex],
    ...options.slice(0, outputIndex),
    ...options.slice(outputIndex , ),
  ];
};
