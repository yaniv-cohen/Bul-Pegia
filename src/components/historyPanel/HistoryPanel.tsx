import { History } from "../../types/historyTypes";
import Entry from "./Entry";

export const HistoryPanel = ({ history }: { history: History }) => {
  return (
    <aside className="HistoryPanel">
      <h2>this is a aside</h2>
      <h2>Results:</h2>

      <ul id="resultsList">
        {history.rounds.map((round) => (
          <Entry round={round}></Entry>
        ))}
      </ul>
    </aside>
  );
};
export default HistoryPanel;
