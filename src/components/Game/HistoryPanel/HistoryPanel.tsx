import { Round } from "../../../types/game";
import { FlexReversedColumn } from "../../utils/FlexReversedColumn";
import { H2 } from "../../utils/Headings";
import Entry from "./Entry";

export const HistoryPanel = ({
  rounds,
  setChosenOption,
}: {
  rounds: Round[];
  setChosenOption: (index: number, color: string) => void;
}) => {
  return (
    <div className="HistoryPanel">
      <H2 text="תוצאות:" />
      <FlexReversedColumn>
        {rounds.map((round, index) => (
          <Entry key={index} round={round} setChosenOption={setChosenOption} />
        ))}
      </FlexReversedColumn>
    </div>
  );
};
export default HistoryPanel;
