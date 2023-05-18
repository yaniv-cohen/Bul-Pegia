import { Round } from "../../types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "../../utils/letters";
import Circle from "../utils/Circle";

export const Entry = ({ round }: { round: Round }) => {
  return (
    <div className="flex-row Entry">
      {round.input.split("").map((char, index) => {
        return (
          <span
            key={char + index}
            className={
              "historyChar circle " + COLOR_LIST[LETTER_OPTIONS.indexOf(char)]
            }
          >
            {COLOR_LIST[LETTER_OPTIONS.indexOf(char)].slice(0, 3) + "."}
          </span>
        );
      })}
      {round.output.white + "/" + round.output.black}
    </div>
  );
};
export default Entry;
