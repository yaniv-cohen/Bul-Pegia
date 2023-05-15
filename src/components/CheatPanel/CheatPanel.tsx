import { History } from "../../types/historyTypes";
import Entry from "../historyPanel/Entry";
import Option from "./Option";

export const CheatPanel = ({
  setSelection,
  options,
}: {
  setSelection: Function;
  options: string[][];
}) => {
  return (
    <aside>
      <h2>this is a cheat panel</h2>
      <h2>options:</h2>

      <ul id="resultsList">
        {options.map((option, count) => (
          <Option
          setSelection={setSelection}
            key={count}
            option={option}
          ></Option>
        ))}
      </ul>
    </aside>
  );
};
export default CheatPanel;
