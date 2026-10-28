import { charToColor, charsToColors, colorToChar } from "./colors";

test("letters and colors map both ways", () => {
  expect(charToColor("A")).toBe("red");
  expect(charsToColors(["H", "E"])).toEqual(["grey", "blue"]);
  expect(colorToChar("purple")).toBe("F");
});
