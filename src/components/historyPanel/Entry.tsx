import { Round } from "../../types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "../../utils/letters";
import Circle from "../utils/Circle";

export const Entry = ({
  round,
}: {
  round: Round;
}) => {
  return (
    <div className="flex-row">
      {`Guess: ${round.input}`}
      {round.input
        .split("")
        .map((char) => {
          console.log('😊',char, LETTER_OPTIONS.indexOf(char), COLOR_LIST[LETTER_OPTIONS.indexOf(char)]);

          return <div className={"historyChar circle " + COLOR_LIST[LETTER_OPTIONS.indexOf(char)]}>{char}</div>;
        })}
      {new Array(round.output.black).map((index) => (
        <Circle color="black" side={10}></Circle>
      ))}
    </div>
  );
};
export default Entry;
