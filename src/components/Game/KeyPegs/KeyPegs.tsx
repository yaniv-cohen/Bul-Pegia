import { CSSProperties } from "react";
import { Result } from "../../../types/game";

export type KeyPegState = "empty" | "white" | "black";

const KEY_PEG_LABELS: Record<KeyPegState, string> = {
  black: "שחור",
  white: "לבן",
  empty: "ריק",
};

/** Only the pegs that were earned - no placeholders for the rest. */
export const resultToKeyPegs = (result: Result): KeyPegState[] => [
  ...new Array<KeyPegState>(result.black).fill("black"),
  ...new Array<KeyPegState>(result.white).fill("white"),
];

export const keyPegsToResult = (pegs: KeyPegState[]): Result => ({
  black: pegs.filter((peg) => peg === "black").length,
  white: pegs.filter((peg) => peg === "white").length,
});

/** The small black/white score pegs, laid out in two rows like the real board. */
export const KeyPegs = ({
  pegs,
  onPegClick,
}: {
  pegs: KeyPegState[];
  onPegClick?: (index: number) => void;
}) => {
  const style = { "--columns": Math.max(1, Math.ceil(pegs.length / 2)) } as CSSProperties;
  const result = keyPegsToResult(pegs);

  if (onPegClick) {
    return (
      <div className="KeyPegs KeyPegs--editable" style={style}>
        {pegs.map((peg, index) => (
          <button
            key={index}
            type="button"
            className={`KeyPeg KeyPeg--${peg}`}
            onClick={() => onPegClick(index)}
            aria-label={`יתד ${index + 1}: ${KEY_PEG_LABELS[peg]}`}
          />
        ))}
      </div>
    );
  }
  return (
    <div
      className="KeyPegs"
      style={style}
      role="img"
      aria-label={`${result.black} שחורים, ${result.white} לבנים`}
    >
      {pegs.map((peg, index) => (
        <span key={index} className={`KeyPeg KeyPeg--${peg}`} />
      ))}
    </div>
  );
};
