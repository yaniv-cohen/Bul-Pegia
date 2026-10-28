import { getAllNonRepeatingPermutations } from "./getAllNonRepeatingPermutations";

test("count is nPr and no combination repeats a letter", () => {
  const out = getAllNonRepeatingPermutations(["A", "B", "C", "D", "E"], 3);
  expect(out).toHaveLength(5 * 4 * 3);
  out.forEach((combination) => expect(new Set(combination).size).toBe(3));
});

test("asking for more slots than letters gives nothing", () => {
  expect(getAllNonRepeatingPermutations(["A", "B"], 3)).toEqual([]);
});
