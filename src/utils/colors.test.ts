import { DEFAULT_PALETTE, isValidPalette, swapPinColor } from "./colors";

describe("swapPinColor", () => {
  test("gives a pin an unused color", () => {
    const palette = swapPinColor(DEFAULT_PALETTE, 5, "white");
    expect(palette[5]).toBe("white");
    expect(palette.filter((id, i) => i !== 5)).toEqual(DEFAULT_PALETTE.filter((id, i) => i !== 5));
  });

  test("swaps with the pin that already has the color", () => {
    const palette = swapPinColor(DEFAULT_PALETTE, 5, "red");
    expect(palette[5]).toBe("red");
    expect(palette[0]).toBe("purple");
    expect(new Set(palette).size).toBe(palette.length);
  });

  test("choosing the pin's own color changes nothing", () => {
    expect(swapPinColor(DEFAULT_PALETTE, 2, "yellow")).toEqual(DEFAULT_PALETTE);
  });
});

test("isValidPalette rejects unknown, duplicate or missing colors", () => {
  expect(isValidPalette(DEFAULT_PALETTE)).toBe(true);
  expect(isValidPalette(["nope", ...DEFAULT_PALETTE.slice(1)])).toBe(false);
  expect(isValidPalette(["red", ...DEFAULT_PALETTE.slice(1, 7), "red"])).toBe(false);
  expect(isValidPalette(DEFAULT_PALETTE.slice(1))).toBe(false);
  expect(isValidPalette("red")).toBe(false);
});
