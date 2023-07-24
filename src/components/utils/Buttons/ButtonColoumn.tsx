import { Button } from "@chakra-ui/react";

export const ButtonColoumn = ({
  fn,
  className,
  children,
}: {
  fn: Function;
  className?: string;
  children: any;
}) => {
  return (
    <Button
      onClick={() => {
        fn();
      }}
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
