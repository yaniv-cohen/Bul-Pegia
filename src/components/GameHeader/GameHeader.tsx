import { ReactNode } from "react";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Logo } from "./Logo/Logo";
import { IconGear } from "./PreferencesTab/GearsIcon";
import { PreferencesTab } from "./PreferencesTab/PreferencesTab";
import { PinColorsEditor } from "./PinColors/PinColorsEditor";

export const GameHeader = ({
  children,
  toggleResetOnSubmit,
  resetOnSubmit,
  activeColors,
}: {
  children: ReactNode;
  toggleResetOnSubmit: () => void;
  resetOnSubmit: boolean;
  activeColors: number;
}) => {
  const colorsModal = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false }) ?? false;

  return (
    <>
      <header className="GameHeader">
        <Logo />
        <Popover placement="bottom-start">
          {({ onClose }) => (
            <>
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
                <PopoverBody display="flex" flexDirection="column" gap={3}>
                  <PreferencesTab
                    toggleResetOnSubmit={toggleResetOnSubmit}
                    resetOnSubmit={resetOnSubmit}
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      onClose();
                      colorsModal.onOpen();
                    }}
                  >
                    {"צבעי היתדות"}
                  </Button>
                </PopoverBody>
              </PopoverContent>
            </>
          )}
        </Popover>
      </header>

      <Modal
        isOpen={colorsModal.isOpen}
        onClose={colorsModal.onClose}
        size={isMobile ? "full" : "lg"}
        isCentered={!isMobile}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{"צבעי היתדות"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <PinColorsEditor activeColors={activeColors} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {children}
    </>
  );
};
