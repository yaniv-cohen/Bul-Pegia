import { Round } from "../../../types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "../../../utils/letters";
import { Circles } from "../../utils/Circles";

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
      {
        <>
          <Circles color="white-result" count={round.output.white} />
          <Circles color="black-result" count={round.output.black} />
        </>
      }
      {/* {round.output.white + "●" + "/" + round.output.black} */}
    </div>
  );
};
export default Entry;
