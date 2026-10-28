import { CSSProperties } from "react";
import { Peg } from "../../utils/Peg/Peg";
import { COLOR_NAMES } from "../../../utils/colors";

export const Slots = ({
  chosenOptions,
  targetSlot,
  setTargetSlot,
}: {
  chosenOptions: Array<string | null>;
  targetSlot: number;
  setTargetSlot: (index: number) => void;
}) => {
  return (
    <ol className="Slots" style={{ "--count": chosenOptions.length } as CSSProperties}>
      {chosenOptions.map((color, index) => (
        <li key={index}>
          <Peg
            color={color}
            size="lg"
            selected={index === targetSlot}
            onClick={() => setTargetSlot(index)}
            label={`מקום ${index + 1}: ${color ? COLOR_NAMES[color] : "ריק"}`}
          />
        </li>
      ))}
    </ol>
  );
};
