import { useEffect, useRef } from "react";

type Handlers = {
  colors: string[];
  slotsCount: number;
  targetSlot: number;
  setTargetSlot: (index: number) => void;
  pickColor: (color: string) => void;
  clearSlot: () => void;
  submit: () => void;
};

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/**
 * 1-8 pick a color, arrows move between slots (mirrored for RTL),
 * Backspace/Delete clear the slot, Enter submits.
 */
export const useKeyboardControls = (handlers: Handlers) => {
  // Read the latest handlers from a ref so the listener is attached only once.
  const latest = useRef(handlers);
  latest.current = handlers;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || isTyping(event.target)) {
        return;
      }
      const { colors, slotsCount, targetSlot, setTargetSlot, pickColor, clearSlot, submit } =
        latest.current;

      const digit = Number(event.key);
      if (Number.isInteger(digit) && digit >= 1 && digit <= colors.length) {
        pickColor(colors[digit - 1]);
      } else if (event.key === "ArrowLeft") {
        // Slots run right-to-left, so left is the next slot.
        setTargetSlot((targetSlot + 1) % slotsCount);
      } else if (event.key === "ArrowRight") {
        setTargetSlot((targetSlot - 1 + slotsCount) % slotsCount);
      } else if (event.key === "Backspace" || event.key === "Delete") {
        clearSlot();
      } else if (event.key === "Enter") {
        // A focused button already handles Enter itself.
        if (event.target instanceof HTMLButtonElement) return;
        submit();
      } else {
        return;
      }
      event.preventDefault();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
};
