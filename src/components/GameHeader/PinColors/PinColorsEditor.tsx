import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { usePalette } from "../../../hooks/usePalette";
import { LETTER_OPTIONS, SWATCH_IDS, SWATCHES } from "../../../utils/colors";
import { LetterPeg, Peg } from "../../utils/Peg/Peg";

/** Pick a pin, then pick its new color. A color already in use swaps between the two pins. */
export const PinColorsEditor = ({ activeColors }: { activeColors: number }) => {
  const { palette, swatchFor, setPinColor, resetPalette } = usePalette();
  const [selectedPin, setSelectedPin] = useState(0);
  const selectedName = swatchFor(LETTER_OPTIONS[selectedPin]).name;

  return (
    <div className="PinColors">
      <p className="PinColors__hint">{"בחרו יתד, ואז בחרו לו צבע חדש."}</p>
      <ol className="PinColors__pins" aria-label="היתדות">
        {LETTER_OPTIONS.map((letter, index) => (
          <li key={letter} className={index < activeColors ? "" : "PinColors__pin--inactive"}>
            <LetterPeg
              letter={letter}
              selected={index === selectedPin}
              onClick={() => setSelectedPin(index)}
              label={`יתד ${index + 1}: ${swatchFor(letter).name}`}
            />
            <span aria-hidden>{index + 1}</span>
          </li>
        ))}
      </ol>

      <p className="PinColors__title">{`צבע ליתד ${selectedPin + 1} (עכשיו ${selectedName}):`}</p>
      <ul className="PinColors__swatches" aria-label="צבעים">
        {SWATCH_IDS.map((id) => {
          const usedBy = palette.indexOf(id);
          const swappedWith = usedBy !== -1 && usedBy !== selectedPin ? usedBy + 1 : null;
          return (
            <li key={id}>
              <Peg
                swatch={SWATCHES[id]}
                size="sm"
                selected={usedBy === selectedPin}
                onClick={() => setPinColor(selectedPin, id)}
                label={
                  SWATCHES[id].name + (swappedWith ? ` (יתחלף עם יתד ${swappedWith})` : "")
                }
              />
              {swappedWith && (
                <span className="PinColors__badge" aria-hidden>
                  {swappedWith}
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <Button variant="ghost" size="sm" alignSelf="center" onClick={resetPalette}>
        {"איפוס לצבעי ברירת המחדל"}
      </Button>
    </div>
  );
};
