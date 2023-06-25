import { charsToColors } from "../logic/charsToColors";
import { Round } from "../types/historyTypes";
import { FlexRow } from "./utils/FlexRow";

export const ResultsRow = ({ round, slot }: { round: Round; slot: number }) => {
  return (
    <FlexRow>
      {charsToColors(round.input.split("")).map((color, index) => {
        return (
          <div key={color + slot + index} className={color}>
            {color}
          </div>
        );
      })}
      {"W/B"}
      {round.output.white + '/'}
      {round.output.black}
    </FlexRow>
  );
};
