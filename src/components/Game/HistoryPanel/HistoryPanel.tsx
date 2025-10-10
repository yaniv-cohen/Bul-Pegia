import { History } from "../../../types/historyTypes";
import { charToColor } from "../../../utils/stringToColors";
import { Circles } from "../../utils/Circle/Circles";
import { ColoredCirclesFromArray } from "../../utils/ColoredCirclesFromArray";
import { FlexReversedColoumn } from "../../utils/FlexReversedColoumn";
import { FlexRow } from "../../utils/FlexRow";
import { H2 } from "../../utils/Headings";
import Entry from "./Entry";

export const HistoryPanel = ({
  history,
  setChosenOption,
}: {
  history: History;
  setChosenOption: (arg0: number, arg1: any) => any;
}) => {
  return (
    <div className="HistoryPanel">
      <H2 text="תוצאות:" />
      {[...history.rounds].reverse().map((round, index) => {
        const colorArr = round.input.split("").map(charToColor);
        return (
          <FlexRow key={index}>
          <div key={index}>
            <ColoredCirclesFromArray colorList={colorArr} colorsCount={round.input.length} />
          </div>
                <div style={{ padding: 0 }}>
        {round.output.white + round.output.black ? (
          <>
            <Circles color="white" count={round.output.white} />
            <Circles color="black" count={round.output.black} />
          </>
        ) : (
          <Circles color="transperant" count={1} />
        )}
      </div>
          </FlexRow>
        );
      })}
    </div>
  );
};
export default HistoryPanel;
