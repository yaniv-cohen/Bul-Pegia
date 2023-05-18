import { COLOR_LIST, LETTER_OPTIONS } from "../../utils/letters";
import Option from "./Option";

export const CheatPanel = ({
  setSelection,
  options,
}: {
  setSelection: Function;
  options: string[][];
}) => {
  return (
    <div>
      <h2>this is a cheat panel</h2>
      <h2>options:</h2>
      <p>
        {"Available options: " +
          options.length
        }
      </p>

      <ul id="resultsList">
        {options.map((option, count) => (
          <Option
            setSelection={setSelection}
            key={count}
            option={option.map(letter => {
              LETTER_OPTIONS.indexOf(letter)
              return COLOR_LIST[LETTER_OPTIONS.indexOf(letter)]
            })}
          ></Option>
        ))}
      </ul>
    </div>
  );
};
export default CheatPanel;
