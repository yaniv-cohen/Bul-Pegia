import { CSSProperties } from "react";
import { Round } from "../../../types/game";
import { LetterPeg } from "../../utils/Peg/Peg";
import { KeyPegs, resultToKeyPegs } from "../KeyPegs/KeyPegs";

export const Entry = ({
  number,
  round,
  setChosenOption,
}: {
  number: number;
  round: Round;
  setChosenOption: (index: number, letter: string) => void;
}) => {
  const letters = round.input.split("");
  return (
    <li className="Entry" style={{ "--clue-columns": Math.ceil(letters.length / 2) } as CSSProperties}>
      <span className="Entry__number">{number}</span>
      <div className="Entry__guess">
        {letters.map((letter, index) => (
          <LetterPeg
            key={index}
            letter={letter}
            size="sm"
            onClick={() => setChosenOption(index, letter)}
          />
        ))}
      </div>
      <KeyPegs pegs={resultToKeyPegs(round.output)} />
    </li>
  );
};
export default Entry;
