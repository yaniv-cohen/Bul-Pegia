import { ReactNode } from "react";

/** One labelled setting row on the start screen. */
export const Option = ({ text, children }: { text: string; children: ReactNode }) => (
  <div className="Option">
    <span className="Option__label">{text}</span>
    {children}
  </div>
);
