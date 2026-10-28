import { ReactNode } from "react";
import { COLOR_NAMES } from "../../../utils/colors";

type PegSize = "sm" | "md" | "lg";

/** A round game peg. Renders a button when clickable, otherwise a plain span. */
export const Peg = ({
  color,
  size = "md",
  selected = false,
  label,
  onClick,
  children,
}: {
  color: string | null;
  size?: PegSize;
  selected?: boolean;
  label?: string;
  onClick?: () => void;
  children?: ReactNode;
}) => {
  const className = [
    "Peg",
    `Peg--${size}`,
    color ? `Peg--${color}` : "Peg--empty",
    selected ? "Peg--selected" : "",
  ].join(" ");
  const ariaLabel = label ?? (color ? COLOR_NAMES[color] : "ריק");

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }
  return (
    <span className={className} role="img" aria-label={ariaLabel}>
      {children}
    </span>
  );
};
