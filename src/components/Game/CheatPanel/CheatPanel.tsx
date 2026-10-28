import { Button } from "@chakra-ui/react";
import { useState } from "react";
import Option from "./Option";

const PAGE_SIZE = 10;

export const CheatPanel = ({
  onSelect,
  options,
}: {
  onSelect: (letters: string[]) => void;
  options: string[][];
}) => {
  const [startIndex, setStartIndex] = useState(0);
  // The first option is the recommendation shown above the list.
  const others = options.slice(1);
  // The options list shrinks after every guess, so keep the page in range.
  const pageStart = startIndex < others.length ? startIndex : 0;
  const page = others.slice(pageStart, pageStart + PAGE_SIZE);
  const select = (letters: string[]) => {
    onSelect(letters);
    setStartIndex(0);
  };

  if (options.length === 0) {
    return <p className="CheatPanel__empty">{"אין רצף שמתאים לכל התוצאות עד עכשיו"}</p>;
  }

  return (
    <div className="CheatPanel">
      <p className="CheatPanel__lead">{"אלגוריתם חכם עוזר לך לנצח"}</p>
      <div className="CheatPanel__best">
        <span>{`ניחוש מומלץ מתוך ${options.length.toLocaleString("he-IL")}:`}</span>
        <Option onSelect={select} option={options[0]} />
      </div>
      <ul className="CheatPanel__list">
        {page.map((option, index) => (
          <li key={pageStart + index}>
            <Option onSelect={select} option={option} />
          </li>
        ))}
      </ul>
      {others.length > PAGE_SIZE && (
        <div className="CheatPanel__pages">
          <Button
            size="sm"
            variant="ghost"
            isDisabled={pageStart === 0}
            onClick={() => setStartIndex(Math.max(pageStart - PAGE_SIZE, 0))}
          >
            {"→ הקודם"}
          </Button>
          <span>{`${pageStart + 1}–${Math.min(pageStart + PAGE_SIZE, others.length)}`}</span>
          <Button
            size="sm"
            variant="ghost"
            isDisabled={pageStart + PAGE_SIZE >= others.length}
            onClick={() => setStartIndex(pageStart + PAGE_SIZE)}
          >
            {"הבא ←"}
          </Button>
        </div>
      )}
    </div>
  );
};
export default CheatPanel;
