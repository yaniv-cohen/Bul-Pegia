import { KeyPegs, KeyPegState, keyPegsToResult } from "../KeyPegs/KeyPegs";

const NEXT_STATE: Record<KeyPegState, KeyPegState> = {
  empty: "white",
  white: "black",
  black: "empty",
};

/** Lets the human opponent score a guess by tapping key pegs. */
export const HumanScore = ({
  pegs,
  setPegs,
  error,
}: {
  pegs: KeyPegState[];
  setPegs: (pegs: KeyPegState[]) => void;
  error?: string;
}) => {
  const { black, white } = keyPegsToResult(pegs);
  return (
    <div className="HumanScore">
      <p className="HumanScore__title">{"מה היריב ענה? הקש על יתד: ריק ← לבן ← שחור"}</p>
      <div className="HumanScore__row">
        <KeyPegs
          pegs={pegs}
          onPegClick={(index) =>
            setPegs(pegs.map((peg, i) => (i === index ? NEXT_STATE[peg] : peg)))
          }
        />
        <span className="HumanScore__count" aria-live="polite">
          {`${black} שחורים · ${white} לבנים`}
        </span>
      </div>
      {error && (
        <p className="HumanScore__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
