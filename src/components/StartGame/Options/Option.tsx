import { ReactNode } from "react";

export const Option = ({
  text,
  currentValue,
  children,
}: {
  text: string;
  currentValue: ReactNode;
  children: ReactNode;
}) => (
  <div className="Option">
    <h3>{text}</h3>
    <h3>{currentValue}</h3>
    {children}
  </div>
);
