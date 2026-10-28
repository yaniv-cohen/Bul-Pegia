import { usePalette } from "../../../hooks/usePalette";
import { LetterPeg } from "../../utils/Peg/Peg";

export const Option = ({
  onSelect,
  option,
}: {
  onSelect: (letters: string[]) => void;
  option: string[];
}) => {
  const { swatchFor } = usePalette();
  return (
    <button
      type="button"
      className="CheatOption"
      onClick={() => onSelect(option)}
      aria-label={"בחר: " + option.map((letter) => swatchFor(letter).name).join(", ")}
    >
      {option.map((letter, index) => (
        <LetterPeg key={index} letter={letter} size="sm" />
      ))}
    </button>
  );
};
export default Option;
