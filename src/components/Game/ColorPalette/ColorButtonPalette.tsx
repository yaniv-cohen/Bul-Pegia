import { useState } from "react";
import { LetterPeg } from "../../utils/Peg/Peg";

export const ColorButtonPalette = ({
  letters,
  pickLetter,
  jumpToNextSlot,
  showShortcuts,
}: {
  letters: string[];
  pickLetter: (letter: string) => void;
  jumpToNextSlot: () => void;
  showShortcuts: boolean;
}) => {
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);
  return (
    <ul className="Palette">
      {letters.map((letter, index) => (
        <li key={letter}>
          <LetterPeg
            letter={letter}
            onClick={() => {
              // Picking the same color twice in a row skips ahead to the next slot.
              if (index === lastClickedIndex) {
                jumpToNextSlot();
              }
              setLastClickedIndex(index);
              pickLetter(letter);
            }}
          >
            {showShortcuts ? index + 1 : null}
          </LetterPeg>
        </li>
      ))}
    </ul>
  );
};
