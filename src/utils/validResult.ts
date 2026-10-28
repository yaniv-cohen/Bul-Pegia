import { Result } from "../types/game";

/** A score is possible if it fits in the slots and isn't "all but one black, plus one white". */
export const validResult = (result: Result, slotsCount: number) => {
  const total = result.black + result.white;
  if (total > slotsCount) return false;
  return !(result.black === slotsCount - 1 && result.white === 1);
};
