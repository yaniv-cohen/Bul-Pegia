import { Result } from "../types/historyTypes";
import { getAllPermutations } from "../utils/getAllPermutations";
import { getResult } from "./getResult";

export const gernerateOptions = async (
  slots: number,
  options: string[],
  inputWord: string[],
  result: Result,
  allPossibleCombinations: Array<string[]> = getAllPermutations(options, slots)
): Promise<Array<string[]>> => {
  const newPossibleCombinations = allPossibleCombinations.filter(
    (possibility, i) => {
      const out = getResult(possibility, inputWord);
      if (result.black === out.black && result.white === out.white) {
        return true;
      }
    }
  );
  return newPossibleCombinations;
};
