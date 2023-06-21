import { charsToColors } from "../logic/charsToColors";
import { Round } from "../types/historyTypes";
import Circle from "./utils/Circle";
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
      {
        new Array(round.output.white).map((circle, index) => {
          return <Circle key={index} color="white" side={10} />;
        })}
      {round.output.white + '/'}
      {round.output.black}
    </FlexRow>
  );
};
