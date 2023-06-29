import { useEffect, useState } from "react";
import { charsToColors } from "../../../logic/charsToColors";
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
      <div>
        <h2>{"אלגוריתם חכם עוזר לך לנצח"}</h2>
        <p>
          {"ניחוש מומלץ מתוך " +
            options.length
          }
        </p>
      </div>
      <div>
        <p>{`${startIndex}+${pagination}`}</p>
        <button onClick={() => setStartIndex(Math.min(startIndex + pagination, options.length - pagination))}>+</button>
        <button onClick={() => setStartIndex(Math.max(startIndex - pagination, 0))}>-</button>
      </div>
      <ul id="resultsList">
        {currentSelection.map((option, count) => {
          if (option)
            return <Option
              setSelection={setSelection}
              key={count}
              option={charsToColors(option)}
            ></Option>
        }
        )}
      </ul>
    </div>
  );
};
export default CheatPanel;
