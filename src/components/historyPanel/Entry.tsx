import { Round } from "../../types/historyTypes";
import Circle from "../utils/circle";

export const Entry = ({ round }: { round: Round }) => {
  return (
    <div>
      {`Guess: ${round.input}`}
      {new Array(round.output.black).map((index) => (
        <Circle color="black" side={10}></Circle>
      ))}
    </div>
  );
};
export default Entry;
