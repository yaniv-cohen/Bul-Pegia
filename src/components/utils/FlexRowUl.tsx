import { ReactNode } from "react";

export const FlexRowUl = ({ className = "", children }: { className?: string; children: ReactNode }) => {
  return <ul className={`${className} FlexRow`}>{children}</ul>;
};
