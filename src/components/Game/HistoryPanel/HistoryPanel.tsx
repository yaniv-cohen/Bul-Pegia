import { History } from "../../../types/historyTypes";
import { FlexReversedColoumn } from "../../utils/FlexReversedColoumn";
import { H2 } from "../../utils/Headings";
import Entry from "./Entry";

export const HistoryPanel = ({ history, setChosenOption }: { history: History, setChosenOption: (arg0: number, arg1: any) => any }) => {
  return (
    <div className="HistoryPanel">
      <H2 text="תוצאות:" />

      <FlexReversedColoumn id="EntryList">
        {history.rounds.map((round, index) => (
          <Entry key={index} round={round} setChosenOption={setChosenOption}/>
        ))}
      </FlexReversedColoumn>
    </div >
  );
};
export default HistoryPanel;
