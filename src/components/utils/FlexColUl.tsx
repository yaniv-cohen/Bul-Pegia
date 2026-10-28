import { ReactNode } from "react";

export const FlexColUl = ({ className = "", children }: { className?: string; children: ReactNode }) => {
  return <ul className={`FlexColumn FlexUl ${className}`}>{children}</ul>;
};
