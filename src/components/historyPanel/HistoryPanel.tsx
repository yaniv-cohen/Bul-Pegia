import { History } from "../../types/historyTypes";
import Entry from "./Entry";

export const HistoryPanel = ({ history }: { history: History }) => {
  return (
    <aside className="HistoryPanel">
      <h2>Results:</h2>

      <ul id="EntryList">
        {history.rounds.map((round, index) => (
          <Entry key={index} round={round} />
        ))}
      </ul>
    </aside>
  );
};
export default HistoryPanel;
