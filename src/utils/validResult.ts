import { Result } from "../types/historyTypes";

export const validResult = (result: Result, slotsCount: number) => {
  return result.black + result.white <= slotsCount;
};
