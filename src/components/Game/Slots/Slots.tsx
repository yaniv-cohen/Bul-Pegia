import { CSSProperties } from "react";
import { LetterPeg } from "../../utils/Peg/Peg";
import { usePalette } from "../../../hooks/usePalette";

export const Slots = ({
  chosenOptions,
  targetSlot,
  setTargetSlot,
}: {
  chosenOptions: Array<string | null>;
  targetSlot: number;
  setTargetSlot: (index: number) => void;
}) => {
  const { swatchFor } = usePalette();
  return (
    <ol className="Slots" style={{ "--count": chosenOptions.length } as CSSProperties}>
      {chosenOptions.map((letter, index) => (
        <li key={index}>
          <LetterPeg
            letter={letter}
            size="lg"
            selected={index === targetSlot}
            onClick={() => setTargetSlot(index)}
            label={`מקום ${index + 1}: ${letter ? swatchFor(letter).name : "ריק"}`}
          />
        </li>
      ))}
    </ol>
  );
};
