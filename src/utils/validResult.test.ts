import { validResult } from "./validResult";

test("blacks plus whites cannot exceed the slot count", () => {
  expect(validResult({ black: 2, white: 2 }, 4)).toBe(true);
  expect(validResult({ black: 3, white: 2 }, 4)).toBe(false);
});

test("all but one black plus a single white is impossible", () => {
  expect(validResult({ black: 3, white: 1 }, 4)).toBe(false);
  expect(validResult({ black: 3, white: 0 }, 4)).toBe(true);
  expect(validResult({ black: 4, white: 0 }, 4)).toBe(true);
});
