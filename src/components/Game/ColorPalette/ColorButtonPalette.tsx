import { useState } from "react";
import { Peg } from "../../utils/Peg/Peg";

export const ColorButtonPalette = ({
  colors,
  pickColor,
  jumpToNextSlot,
  showShortcuts,
}: {
  colors: string[];
  pickColor: (color: string) => void;
  jumpToNextSlot: () => void;
  showShortcuts: boolean;
}) => {
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);
  return (
    <ul className="Palette">
      {colors.map((color, index) => (
        <li key={color}>
          <Peg
            color={color}
            onClick={() => {
              // Picking the same color twice in a row skips ahead to the next slot.
              if (index === lastClickedIndex) {
                jumpToNextSlot();
              }
              setLastClickedIndex(index);
              pickColor(color);
            }}
          >
            {showShortcuts ? index + 1 : null}
          </Peg>
        </li>
      ))}
    </ul>
  );
};
