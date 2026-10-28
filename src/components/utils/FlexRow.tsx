import { ReactNode } from "react";

export const FlexRow = ({ className = "", children }: { className?: string; children: ReactNode }) => {
  return <div className={`${className} FlexRow`}>{children}</div>;
};
