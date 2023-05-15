import { Round } from "../types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "../utils/letters";
import Circle from "./utils/Circle";
import { FlexRow } from "./utils/FlexRow";

export const ResultsRow = ({ round, slot }: { round: Round; slot: number }) => {
  return (
    <FlexRow>
      {round.input.split("").map((char) => {
        return (
          <div
            key={char + slot}
            className={COLOR_LIST[LETTER_OPTIONS.indexOf(char)]}
          >
            {char}
          </div>
        );
      })}
      {}
      {new Array(round.output.white).map((circle) => {
        return <Circle color="white" side={10} />;
      })}
      {round.output.black}
    </FlexRow>
  );
};
