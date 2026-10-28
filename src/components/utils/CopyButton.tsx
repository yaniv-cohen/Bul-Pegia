import { Button } from "@chakra-ui/react";
import { ReactNode } from "react";
import CopySVG from "/copy.svg";

export const CopyButton = ({
  value,
  children,
}: {
  value: string;
  children: ReactNode;
}) => {
  return (
    <Button
      className="spaced-rtl"
      onClick={() => {
        navigator.clipboard.writeText(value);
      }}
    >
      {children}
      <img src={CopySVG} alt="העתק" className="icon" />
    </Button>
  );
};
