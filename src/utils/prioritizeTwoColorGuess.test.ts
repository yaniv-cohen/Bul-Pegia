import { prioritizeTwoColorGuess } from "./prioritizeTwoColorGuess";

test("moves the first two-color combination to the front", () => {
  const all = [["A", "A", "A"], ["A", "A", "B"], ["A", "B", "C"]];
  expect(prioritizeTwoColorGuess(all)[0]).toEqual(["A", "A", "B"]);
});

test("leaves the list alone when there is no two-color combination", () => {
  const all = [["A", "B", "C"]];
  expect(prioritizeTwoColorGuess(all)).toEqual(all);
});
