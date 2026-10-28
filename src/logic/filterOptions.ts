import { Result } from "../types/game";
import { getAllPermutations } from "../utils/getAllPermutations";
import { getResult } from "./getResult";

/** Keep only the combinations that would have given `result` for `guess`. */
export const filterOptions = (
  slots: number,
  letters: string[],
  guess: string[],
  result: Result,
  allPossibleCombinations: string[][] = getAllPermutations(letters, slots)
): string[][] =>
  allPossibleCombinations.filter((possibility) => {
    const out = getResult(possibility, guess);
    return result.black === out.black && result.white === out.white;
  });
