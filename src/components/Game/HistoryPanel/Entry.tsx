import { Round } from "../../../types/game";
import { charToColor } from "../../../utils/colors";
import { Circles } from "../../utils/Circle/Circles";
import { FlexRow } from "../../utils/FlexRow";

export const Entry = ({
  round,
  setChosenOption,
}: {
  round: Round;
  setChosenOption: (index: number, color: string) => void;
}) => {
  return (
    <FlexRow className="Entry">
      <div>
        {round.input.split("").map((char, index) => {
          const color = charToColor(char);
          return (
            <span
              key={char + index}
              onClick={() => setChosenOption(index, color)}
              className={"color-result " + color}
            >
              {color.slice(0, 3) + "."}
            </span>
          );
        })}
      </div>
      <div style={{ padding: 0 }}>
        {round.output.white + round.output.black ? (
          <>
            <Circles color="white-result" count={round.output.white} />
            <Circles color="black-result" count={round.output.black} />
          </>
        ) : (
          <Circles color="transperant-result" count={1} />
        )}
      </div>
    </FlexRow>
  );
};
export default Entry;
