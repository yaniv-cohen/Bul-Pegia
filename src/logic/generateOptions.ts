import { Result } from "../types/historyTypes";
import { getAllPermutations } from "../utils/getAllPermutations";
import { LETTER_OPTIONS } from "../utils/letters";
import { getResult } from "./getResult";

export const gernerateOptions = (
  slots: number,
  options: string[],
  inputWord: string[],
  result: Result,
  allPossibleCombinations: Array<string[]> = getAllPermutations(options, slots)
): any[] => {
  console.log("starting with " + allPossibleCombinations.length);
  const newPossibleCombinations = allPossibleCombinations.filter(
    (possibility, i) => {
      const out = getResult(possibility, inputWord);
      if (result.black === out.black && result.white === out.white) {
        return true;
      }
    }
  );
  console.log("returning", newPossibleCombinations.length);
  return newPossibleCombinations;
};
