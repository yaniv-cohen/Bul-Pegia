export const Slot = ({
  highlighted,
  index,
  value,
  setTargetSlot,
}: {
  setTargetSlot: (index: number) => void;
  highlighted: boolean;
  value: string | null;
  index: number;
}) => {
  return (
    <li
      className={"slot " + (value ?? "empty-slot") + (highlighted ? " chosen" : "")}
      onClick={() => setTargetSlot(index)}
    >
      {value ? value[0].toUpperCase() + value.slice(1) : "?"}
    </li>
  );
};
