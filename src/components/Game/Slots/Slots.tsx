import { FlexRowUl } from "../../utils/FlexRowUl";
import { Slot } from "./Slot";

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
    <FlexRowUl>
      {chosenOptions.map((value, index) => (
        <Slot
          key={index}
          setTargetSlot={setTargetSlot}
          highlighted={index === targetSlot}
          value={value}
          index={index}
        />
      ))}
    </FlexRowUl>
  );
};
