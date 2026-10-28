import { chooseBest } from "./chooseBest";

test("picks the option that shares a black with the most other options", () => {
  const options = [["A", "A"], ["A", "B"], ["B", "B"], ["C", "C"]];
  // "AB" shares a black with AA, AB and BB - more than any other option.
  expect(chooseBest(options)).toEqual([1, ["A", "B"]]);
});

test("a single option is chosen", () => {
  expect(chooseBest([["A", "B", "C"]])).toEqual([0, ["A", "B", "C"]]);
});
