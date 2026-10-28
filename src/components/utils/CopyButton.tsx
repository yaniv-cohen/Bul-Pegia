import { Button, useToast } from "@chakra-ui/react";
import { ReactNode } from "react";
import CopySVG from "/copy.svg";

export const CopyButton = ({ value, children }: { value: string; children: ReactNode }) => {
  const toast = useToast();
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast({ status: "success", title: "הועתק!", duration: 1500, position: "top" });
    } catch {
      toast({ status: "error", title: "לא הצלחתי להעתיק", position: "top" });
    }
  };
  return (
    <Button variant="outline" size="sm" onClick={copy} rightIcon={<img src={CopySVG} alt="" className="icon" />}>
      {children}
    </Button>
  );
};
