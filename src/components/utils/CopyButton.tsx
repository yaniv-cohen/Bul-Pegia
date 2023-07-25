import { Button } from "@chakra-ui/react";
import CopySVG from "/assets/Copy.svg";
export const CopyButton = ({
  value,
  children,
}: {
  value: string;
  children: any;
}) => {
  return (
    <Button
      className="spaced-rtl"
      onClick={() => {
        navigator.clipboard.writeText(value);
      }}
    >
      {children}
      <img src={CopySVG} alt="Click to copy" className="icon" />
    </Button>
  );
};
