import { ReactNode } from "react";

export const StatsItem = ({
  title,
  value,
  children,
}: {
  title: string;
  value?: ReactNode;
  children?: ReactNode;
}) => {
  return (
    <li className="FlexRow spaced-rtl">
      <span>{title + ":"}</span>
      {value !== undefined && <span className="container">{value}</span>}
      {children}
    </li>
  );
};
