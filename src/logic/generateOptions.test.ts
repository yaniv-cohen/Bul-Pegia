import { LETTER_OPTIONS } from "../utils/letters";
import { gernerateOptions } from "./generateOptions";

test.only("possibilities filtering", () => {
  const out = gernerateOptions(
    4,
    LETTER_OPTIONS.slice(0, 5),
    ["A", "B", "C", "D"],
    {
      black: 3,
      white: 0,
    }
  );
  expect(out.length).toEqual(16);
});
