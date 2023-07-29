import { Button } from "@chakra-ui/react";
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
  const [startIndex, setStartIndex] = useState(0);
  const pagination = 10;
  const [currentSelection, setCurrentSelection] = useState(
    options.slice(startIndex, startIndex + pagination)
  );
  useEffect(() => {
    setCurrentSelection(options.slice(startIndex, startIndex + pagination));
    if (currentSelection.length <= 0) {
      setCurrentSelection(options.slice(0, pagination));
    }
  }, [options, startIndex, pagination]);

  return (
    <div>
      <div>
        <h2>{"אלגוריתם חכם עוזר לך לנצח"}</h2>
        <div>
          <span className="rtl"></span>
          {"ניחוש מומלץ מתוך " + options.length}

          <Option
            setSelection={setSelection}
            setStartIndex={setStartIndex}
            option={charsToColors(options[0])}
          ></Option>
        </div>
      </div>
      <div>
        <Button
          onClick={() =>
            setStartIndex(
              Math.min(startIndex + pagination, options.length - pagination)
            )
          }
        >
          +
        </Button>
        <Button
          onClick={() => setStartIndex(Math.max(startIndex - pagination, 0))}
        >
          -
        </Button>
      </div>
      <ul id="resultsList">
        {currentSelection.map((option, count) => {
          if (option)
            return (
              <Option
                setSelection={setSelection}
                setStartIndex={setStartIndex}
                key={count}
                option={charsToColors(option)}
              ></Option>
            );
        })}
      </ul>
    </div>
  );
};
export default CheatPanel;
