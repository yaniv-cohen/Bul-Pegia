import { CSSProperties, ReactNode } from "react";
import { usePalette } from "../../../hooks/usePalette";
import { Swatch } from "../../../utils/colors";

type PegSize = "sm" | "md" | "lg";

type PegProps = {
  size?: PegSize;
  selected?: boolean;
  label?: string;
  onClick?: () => void;
  children?: ReactNode;
};

/** A round peg in the given swatch. Renders a button when clickable, otherwise a plain span. */
export const Peg = ({
  swatch,
  size = "md",
  selected = false,
  label,
  onClick,
  children,
}: PegProps & { swatch: Swatch | null }) => {
  const className = [
    "Peg",
    `Peg--${size}`,
    swatch ? "" : "Peg--empty",
    swatch?.light ? "Peg--light" : "",
    selected ? "Peg--selected" : "",
  ].join(" ");
  const style = swatch ? ({ "--peg-color": swatch.hex } as CSSProperties) : undefined;
  const ariaLabel = label ?? swatch?.name ?? "ריק";

  if (onClick) {
    return (
      <button type="button" className={className} style={style} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }
  return (
    <span className={className} style={style} role="img" aria-label={ariaLabel}>
      {children}
    </span>
  );
};

/** A game peg for a letter, painted in the player's chosen color for it. */
export const LetterPeg = ({ letter, ...props }: PegProps & { letter: string | null }) => {
  const { swatchFor } = usePalette();
  return <Peg swatch={letter ? swatchFor(letter) : null} {...props} />;
};
