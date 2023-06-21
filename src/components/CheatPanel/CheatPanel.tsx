import { useEffect, useState } from "react";
import { charsToColors } from "../../logic/charsToColors";
import Option from "./Option";

export const CheatPanel = ({
  setSelection,
  options,
}: {
  setSelection: Function;
  options: string[][];
}) => {
  const [startIndex, setStartIndex] = useState(0)
  const [pagination, setPagination] = useState(10)
  const [currentSelection, setCurrentSelection] = useState(
    options.slice(startIndex, startIndex + pagination)
  )
  useEffect(() => {
    setCurrentSelection(
      options.slice(startIndex, startIndex + pagination)
    )
  }, [options, startIndex, pagination])
  return (
    <div>
      <h2>this is a cheat panel</h2>
      <h2>options:</h2>
      <p>
        {"Available options: " +
          options.length
        }
      </p>
      <div>
        <p>{`${startIndex}+${pagination}`}</p>
        <button onClick={() => setStartIndex(Math.min(startIndex + pagination, options.length + 1))}>+</button>
        <button onClick={() => setStartIndex(Math.max(startIndex - pagination, 0))}>-</button>
      </div>
      <ul id="resultsList">
        {currentSelection.map((option, count) => (
          <Option
            setSelection={setSelection}
            key={count}
            option={charsToColors(option)}
          ></Option>
        ))}
      </ul>
    </div>
  );
};
export default CheatPanel;
