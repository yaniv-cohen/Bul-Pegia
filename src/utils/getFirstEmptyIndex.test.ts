import { getFirstEmptyIndex } from "./getFirstEmptyIndex";

test("finds the next empty slot after the current one", () => {
  expect(getFirstEmptyIndex(["red", "red", null, null], 0)).toBe(2);
});

test("wraps around to the start", () => {
  expect(getFirstEmptyIndex([null, "red", "red", "red"], 2)).toBe(0);
});

test("returns undefined when every other slot is filled", () => {
  expect(getFirstEmptyIndex(["red", null, "red"], 1)).toBeUndefined();
});
