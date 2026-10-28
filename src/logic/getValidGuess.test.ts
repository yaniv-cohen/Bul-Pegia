import { getValidGuess } from "./getValidGuess";

test("converts colors to letters", () => {
  expect(getValidGuess(["red", "orange", "red", "grey"])).toBe("ABAH");
});

test("returns undefined when a slot is empty", () => {
  expect(getValidGuess(["red", null, "red"])).toBeUndefined();
  expect(getValidGuess(["red", "", "red"])).toBeUndefined();
});
