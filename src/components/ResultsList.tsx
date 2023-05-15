import { History } from "../types/historyTypes";
import { ResultsRow } from "./ResultsRow";

export const ResultsList = ({ history }: { history: History }) => {
  return (
    <div>
      {history.rounds.map((round, count) => (
        <ResultsRow slot={count} round={round}></ResultsRow>
      ))}
    </div>
  );
};
