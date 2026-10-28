import { useState } from "react";
import { FlexColUl } from "../../utils/FlexColUl";
import { ColorButton } from "./ColorButton";

export const ColorButtonPalette = ({
  colors,
  setOptionByCurrentSlot,
  jumpToNextSlot,
}: {
  colors: string[];
  setOptionByCurrentSlot: (color: string) => void;
  jumpToNextSlot: () => void;
}) => {
  const [lastClickedIndex, setLastClickedIndex] = useState<number | null>(null);
  return (
    <FlexColUl>
      {colors.map((color, index) => (
        <ColorButton
          key={color}
          color={color}
          onClick={() => {
            if (index === lastClickedIndex) {
              jumpToNextSlot();
            }
            setLastClickedIndex(index);
            setOptionByCurrentSlot(color);
          }}
        />
      ))}
    </FlexColUl>
  );
};
