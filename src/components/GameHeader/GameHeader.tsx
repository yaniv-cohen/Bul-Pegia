import { ReactNode } from "react";
import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Logo } from "./Logo/Logo";
import { IconGear } from "./PreferencesTab/GearsIcon";
import { PreferencesTab } from "./PreferencesTab/PreferencesTab";

export const GameHeader = ({
  children,
  toggleResetOnSubmit,
  resetOnSubmit,
}: {
  children: ReactNode;
  toggleResetOnSubmit: () => void;
  resetOnSubmit: boolean;
}) => {
  return (
    <>
      <header className="GameHeader">
        <Logo />
        <Popover placement="bottom-start">
          <PopoverTrigger>
            <IconButton
              aria-label="העדפות"
              icon={<IconGear />}
              variant="ghost"
              colorScheme="whiteAlpha"
              color="white"
            />
          </PopoverTrigger>
          <PopoverContent width="auto">
            <PopoverArrow />
            <PopoverBody>
              <PreferencesTab toggleResetOnSubmit={toggleResetOnSubmit} resetOnSubmit={resetOnSubmit} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </header>
      {children}
    </>
  );
};
