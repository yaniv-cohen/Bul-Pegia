import { COLOR_NAMES } from "../../../utils/colors";
import { Peg } from "../../utils/Peg/Peg";

export const Option = ({
  onSelect,
  option,
}: {
  onSelect: (colors: string[]) => void;
  option: string[];
}) => {
  return (
    <button
      type="button"
      className="CheatOption"
      onClick={() => onSelect(option)}
      aria-label={"בחר: " + option.map((color) => COLOR_NAMES[color]).join(", ")}
    >
      {option.map((color, index) => (
        <Peg key={index} color={color} size="sm" />
      ))}
    </button>
  );
};
export default Option;
