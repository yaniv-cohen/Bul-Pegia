import { Result } from "../types/game";

export const validResult = (result: Result, slotsCount: number) => {
  return result.black + result.white <= slotsCount;
};
