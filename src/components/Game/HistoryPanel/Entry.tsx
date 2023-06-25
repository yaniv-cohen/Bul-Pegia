import { Round } from "../../../types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "../../../utils/letters";
import { Circles } from "../../utils/Circles";
import { FlexRow } from "../../utils/FlexRow";

export const Entry = ({ round }: { round: Round }) => {
  return (
    <FlexRow className="Entry">
      <div>{round.input.split("").map((char, index) => {
        return (
          <span
            key={char + index}
            className={
              "color-result " + COLOR_LIST[LETTER_OPTIONS.indexOf(char)]
            }
          >
            {COLOR_LIST[LETTER_OPTIONS.indexOf(char)].slice(0, 3) + "."}
          </span>
        );
      })}
      </div>
      <div>

        <Circles color="white-result" count={round.output.white} />
        <Circles color="black-result" count={round.output.black} />

      </div>

    </FlexRow>
  );
};
export default Entry;
