import { validResult } from "./validResult";

test("blacks plus whites cannot exceed the slot count", () => {
  expect(validResult({ black: 2, white: 2 }, 4)).toBe(true);
  expect(validResult({ black: 3, white: 2 }, 4)).toBe(false);
});
