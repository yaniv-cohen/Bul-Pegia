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
    <li className="StatsItem">
      <span className="StatsItem__title">{title}</span>
      {value !== undefined && <span className="StatsItem__value">{value}</span>}
      {children}
    </li>
  );
};
