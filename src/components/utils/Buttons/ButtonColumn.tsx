import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";

export const ButtonColumn = ({
  onClick,
  className,
  children,
}: {
  onClick: () => void;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <Button
      onClick={onClick}
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: "8px",
      }}
      height={"max-content"}
    >
      {children}
    </Button>
  );
};
