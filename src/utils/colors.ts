export const LETTER_OPTIONS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export type Swatch = {
  name: string;
  hex: string;
  /** Light colors get dark text and an outline so they stay visible. */
  light?: boolean;
};

/** Colors a player can choose for their pins. */
export const SWATCHES: Record<string, Swatch> = {
  red: { name: "אדום", hex: "#ff4d5e" },
  orange: { name: "כתום", hex: "#ff8c42" },
  yellow: { name: "צהוב", hex: "#ffd23f", light: true },
  green: { name: "ירוק", hex: "#2ec27e" },
  blue: { name: "כחול", hex: "#3a86ff" },
  purple: { name: "סגול", hex: "#8b5cf6" },
  brown: { name: "חום", hex: "#a0673a" },
  grey: { name: "אפור", hex: "#9aa1b1" },
  white: { name: "לבן", hex: "#f7f7fb", light: true },
  black: { name: "שחור", hex: "#26262e" },
  pink: { name: "ורוד", hex: "#ff7eb6" },
  turquoise: { name: "טורקיז", hex: "#1fc8c8" },
  lime: { name: "ליים", hex: "#b5e61d", light: true },
  navy: { name: "כחול כהה", hex: "#2b3a8f" },
  gold: { name: "זהב", hex: "#e8b43a", light: true },
  maroon: { name: "בורדו", hex: "#8e1f3c" },
};

export const SWATCH_IDS = Object.keys(SWATCHES);

/** A swatch id for each letter, in letter order. */
export type Palette = string[];

export const DEFAULT_PALETTE: Palette = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "brown",
  "grey",
];

/** Give a pin a new color. If another pin already has it, the two pins swap. */
export const swapPinColor = (palette: Palette, letterIndex: number, swatchId: string): Palette => {
  const otherIndex = palette.indexOf(swatchId);
  return palette.map((id, i) => {
    if (i === letterIndex) return swatchId;
    if (i === otherIndex) return palette[letterIndex];
    return id;
  });
};

export const isValidPalette = (value: unknown): value is Palette =>
  Array.isArray(value) &&
  value.length === LETTER_OPTIONS.length &&
  value.every((id) => typeof id === "string" && id in SWATCHES) &&
  new Set(value).size === value.length;
