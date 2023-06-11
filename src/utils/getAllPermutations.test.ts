import { getAllPermutations } from "./getAllPermutations";

test("get All", () => {
  expect(getAllPermutations(["A", "B", "C", "d"], 2).length).toEqual(16);
  expect(getAllPermutations(["A", "B", "C", "d"], 10).length).toEqual(
    Math.pow(4, 10)
  );
  expect(getAllPermutations(["A", "B", "C", "d", "E", "f"], 5).length).toEqual(
    Math.pow(6, 5)
  );
});
