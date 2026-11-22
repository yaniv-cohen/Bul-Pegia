// Wordmark plus a row of glossy pegs drawn to match .Peg (Peg.scss).
// The last peg wears the "selected" sun ring: the hit.
const PEGS = ["#ff6b6b", "#ffd166", "#3ddc97", "#3a86ff"];
const PEG_R = 11;
const PEG_GAP = 27;
const PEG_X0 = 16;

const PegRow = () => {
  const hitX = PEG_X0 + PEG_GAP * (PEGS.length - 1);
  return (
    <svg className="Logo__pegs" viewBox="0 0 114 64" aria-hidden="true">
      <defs>
        <radialGradient id="logo-peg-hl" cx="32%" cy="28%" r="45%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="logo-peg-shade" cx="50%" cy="20%" r="80%">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <circle
        cx={hitX}
        cy={32}
        r={PEG_R + 4.5}
        fill="none"
        stroke="var(--sun)"
        strokeWidth={2.5}
      />
      {PEGS.map((color, i) => {
        const cx = PEG_X0 + PEG_GAP * i;
        return (
          <g key={color}>
            <circle cx={cx} cy={34.5} r={PEG_R} fill="#000" opacity={0.3} />
            <circle cx={cx} cy={32} r={PEG_R} fill={color} />
            <circle cx={cx} cy={32} r={PEG_R} fill="url(#logo-peg-shade)" />
            <circle cx={cx} cy={32} r={PEG_R} fill="url(#logo-peg-hl)" />
          </g>
        );
      })}
    </svg>
  );
};

export const Logo = ({ onClick }: { onClick: () => void }) => (
  <button type="button" className="Logo" onClick={onClick} aria-label="בול פגיעה - למסך הראשי">
    <span className="Logo__text" aria-hidden="true">
      בול פגיעה
    </span>
    <PegRow />
  </button>
);
