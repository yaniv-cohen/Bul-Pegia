import { Round } from "../../../types/game";
import { charToColor } from "../../../utils/colors";
import { Peg } from "../../utils/Peg/Peg";
import { KeyPegs, resultToKeyPegs } from "../KeyPegs/KeyPegs";

export const Entry = ({
  number,
  round,
  setChosenOption,
}: {
  number: number;
  round: Round;
  setChosenOption: (index: number, color: string) => void;
}) => {
  const letters = round.input.split("");
  return (
    <li className="Entry">
      <span className="Entry__number">{number}</span>
      <div className="Entry__guess">
        {letters.map((char, index) => {
          const color = charToColor(char);
          return (
            <Peg
              key={index}
              color={color}
              size="sm"
              onClick={() => setChosenOption(index, color)}
            />
          );
        })}
      </div>
      <KeyPegs pegs={resultToKeyPegs(round.output, letters.length)} />
    </li>
  );
};
export default Entry;
