import { createContext, ReactNode, useContext, useState } from "react";
import {
  DEFAULT_PALETTE,
  isValidPalette,
  LETTER_OPTIONS,
  Palette,
  swapPinColor,
  Swatch,
  SWATCHES,
} from "../utils/colors";

export const PALETTE_STORAGE_KEY = "bul-pgia.palette";

const loadPalette = (): Palette => {
  try {
    const stored = JSON.parse(localStorage.getItem(PALETTE_STORAGE_KEY) ?? "null");
    return isValidPalette(stored) ? stored : DEFAULT_PALETTE;
  } catch {
    return DEFAULT_PALETTE;
  }
};

const savePalette = (palette: Palette) => {
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, JSON.stringify(palette));
  } catch {
    // Storage can be blocked (private mode); the palette still works for this visit.
  }
};

type PaletteContextValue = {
  palette: Palette;
  swatchFor: (letter: string) => Swatch;
  setPinColor: (letterIndex: number, swatchId: string) => void;
  resetPalette: () => void;
};

const PaletteContext = createContext<PaletteContextValue | null>(null);

export const PaletteProvider = ({ children }: { children: ReactNode }) => {
  const [palette, setPalette] = useState<Palette>(loadPalette);

  const update = (next: Palette) => {
    setPalette(next);
    savePalette(next);
  };

  const value: PaletteContextValue = {
    palette,
    swatchFor: (letter) => SWATCHES[palette[LETTER_OPTIONS.indexOf(letter)]],
    setPinColor: (letterIndex, swatchId) => update(swapPinColor(palette, letterIndex, swatchId)),
    resetPalette: () => update(DEFAULT_PALETTE),
  };

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
};

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (!context) {
    throw new Error("usePalette must be used inside a PaletteProvider");
  }
  return context;
};
