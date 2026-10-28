import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { charsToColors } from "../../../utils/colors";
import Option from "./Option";

const PAGE_SIZE = 10;

export const CheatPanel = ({
  setSelection,
  options,
}: {
  setSelection: (colors: string[]) => void;
  options: string[][];
}) => {
  const [startIndex, setStartIndex] = useState(0);
  // The options list shrinks after every guess, so keep the page in range.
  const pageStart = startIndex < options.length ? startIndex : 0;
  const page = options.slice(pageStart, pageStart + PAGE_SIZE);

  const onSelect = (colors: string[]) => {
    setSelection(colors);
    setStartIndex(0);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div>
        <h2>{"אלגוריתם חכם עוזר לך לנצח"}</h2>
        <div>
          {"ניחוש מומלץ מתוך " + options.length}
          {options.length > 0 && (
            <Option onSelect={onSelect} option={charsToColors(options[0])} />
          )}
        </div>
      </div>
      <div>
        <Button
          onClick={() =>
            setStartIndex(Math.max(Math.min(pageStart + PAGE_SIZE, options.length - PAGE_SIZE), 0))
          }
        >
          +
        </Button>
        <Button onClick={() => setStartIndex(Math.max(pageStart - PAGE_SIZE, 0))}>-</Button>
      </div>
      <ul id="resultsList">
        {page.map((option, index) => (
          <Option key={pageStart + index} onSelect={onSelect} option={charsToColors(option)} />
        ))}
      </ul>
    </div>
  );
};
export default CheatPanel;
