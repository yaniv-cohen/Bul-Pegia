import { LETTER_OPTIONS } from "../utils/colors";
import { filterOptions } from "./filterOptions";

test("possibilities filtering", () => {
  const out = filterOptions(4, LETTER_OPTIONS.slice(0, 5), ["A", "B", "C", "D"], {
    black: 3,
    white: 0,
  });
  expect(out.length).toEqual(16);
});
