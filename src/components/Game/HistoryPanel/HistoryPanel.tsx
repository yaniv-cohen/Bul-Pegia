import { Round } from "../../../types/game";
import Entry from "./Entry";

export const HistoryPanel = ({
  rounds,
  setChosenOption,
}: {
  rounds: Round[];
  setChosenOption: (index: number, color: string) => void;
}) => {
  if (rounds.length === 0) {
    return <p className="History__empty">{"הניחושים שלך יופיעו כאן"}</p>;
  }
  return (
    <section className="History" aria-label="ניחושים קודמים">
      <ol className="History__list">
        {rounds.map((round, index) => (
          <Entry key={index} number={index + 1} round={round} setChosenOption={setChosenOption} />
        ))}
      </ol>
    </section>
  );
};
export default HistoryPanel;
