import { Button } from "@chakra-ui/react";
import { useState } from "react";
import Option from "./Option";

const PAGE_SIZE = 10;

export const CheatPanel = ({
  onSelect,
  options,
  recommendation,
}: {
  onSelect: (letters: string[]) => void;
  options: string[][];
  /** The most informative guess; it may not be one of the options. */
  recommendation?: string[];
}) => {
  const [startIndex, setStartIndex] = useState(0);
  // The options list shrinks after every guess, so keep the page in range.
  const pageStart = startIndex < options.length ? startIndex : 0;
  const page = options.slice(pageStart, pageStart + PAGE_SIZE);
  const select = (letters: string[]) => {
    onSelect(letters);
    setStartIndex(0);
  };

  if (options.length === 0) {
    return <p className="CheatPanel__empty">{"אין רצף שמתאים לכל התוצאות עד עכשיו"}</p>;
  }

  const recommendationKey = recommendation?.join("");
  const recommendationPossible =
    !!recommendationKey && options.some((option) => option.join("") === recommendationKey);

  return (
    <div className="CheatPanel">
      <p className="CheatPanel__lead">{"אלגוריתם חכם עוזר לך לנצח"}</p>
      {recommendation && (
        <div className="CheatPanel__best">
          <span>{`ניחוש מומלץ מתוך ${options.length.toLocaleString("he-IL")}:`}</span>
          <Option onSelect={select} option={recommendation} />
          {!recommendationPossible && (
            <span className="CheatPanel__note">{"(לא יכול להיות הפתרון, אבל מצמצם הכי הרבה)"}</span>
          )}
        </div>
      )}
      <ul className="CheatPanel__list">
        {page.map((option, index) => (
          <li key={pageStart + index}>
            <Option onSelect={select} option={option} />
          </li>
        ))}
      </ul>
      {options.length > PAGE_SIZE && (
        <div className="CheatPanel__pages">
          <Button
            size="sm"
            variant="ghost"
            isDisabled={pageStart === 0}
            onClick={() => setStartIndex(Math.max(pageStart - PAGE_SIZE, 0))}
          >
            {"→ הקודם"}
          </Button>
          <span>{`${pageStart + 1}–${Math.min(pageStart + PAGE_SIZE, options.length)}`}</span>
          <Button
            size="sm"
            variant="ghost"
            isDisabled={pageStart + PAGE_SIZE >= options.length}
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
