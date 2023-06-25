import { History } from "../../../types/historyTypes";
import { FlexColumn } from "../../utils/FlexColoumn";
import { FlexRow } from "../../utils/FlexRow";
import { H2 } from "../../utils/Headings";
import Entry from "./Entry";

export const HistoryPanel = ({ history }: { history: History }) => {
  return (
    <div className="HistoryPanel">
      <H2 text="תוצאות:" />

      <FlexColumn id="EntryList">
        {history.rounds.map((round, index) => (
          <Entry key={index} round={round} />
        ))}
      </FlexColumn>
    </div >
  );
};
export default HistoryPanel;
