import { Round } from "../types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "../utils/letters";
import Circle from "./utils/Circle";
import { FlexRow } from "./utils/FlexRow";

export const ResultsRow = ({ round, slot }: { round: Round; slot: number }) => {
  return (
    <FlexRow>
      {round.input.split("").map((char, index) => {
        return (
          <div
            key={char + slot + index}
            className={COLOR_LIST[LETTER_OPTIONS.indexOf(char)]}
          >
            {char}
          </div>
        );
      })}
      { }
      {new Array(round.output.white).map((circle, index) => {
        return <Circle key={index} color="white" side={10} />;
      })}
      {round.output.white+'/'}
      {round.output.black}
    </FlexRow>
  );
};
