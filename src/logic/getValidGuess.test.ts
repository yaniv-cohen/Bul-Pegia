import { getValidGuess } from "./getValidGuess";

test("joins the letters", () => {
  expect(getValidGuess(["A", "B", "A", "H"])).toBe("ABAH");
});

test("returns undefined when a slot is empty", () => {
  expect(getValidGuess(["A", null, "A"])).toBeUndefined();
  expect(getValidGuess(["A", "", "A"])).toBeUndefined();
});
