import { useState } from "react";
import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import CheatPanel from "./CheatPanel/CheatPanel";
import HistoryPanel from "./HistoryPanel/HistoryPanel";
import { FlexColumn } from "../utils/FlexColumn";
import { FlexRow } from "../utils/FlexRow";
import { MainCard } from "../utils/MainCard";
import { H2 } from "../utils/Headings";
import { Slots } from "./Slots/Slots";
import { ColorButtonPalette } from "./ColorPalette/ColorButtonPalette";
import { getFirstEmptyIndex } from "../../utils/getFirstEmptyIndex";
import { validResult } from "../../utils/validResult";
import { GameController } from "../../hooks/useGame";
import { Result } from "../../types/game";

const ScoreInput = ({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}) => (
  <FlexRow className="spaced-rtl">
    <label>{label}</label>
    <NumberInput
      value={value}
      max={max}
      min={0}
      keepWithinRange
      clampValueOnBlur
      onChange={(_, valueAsNumber) => onChange(Number.isNaN(valueAsNumber) ? 0 : valueAsNumber)}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  </FlexRow>
);

export const Game = ({ controller }: { controller: GameController }) => {
  const { chosenOptions, setChosenOption, settings, game } = controller;
  const slotsCount = settings.slotsCount;
  const [useCheatPanel, setUseCheatPanel] = useState(false);
  const [targetSlot, setTargetSlot] = useState(0);
  const [manual, setManual] = useState<Result>({ black: 0, white: 0 });

  const jumpToNextSlot = () => {
    const nextEmptySlotIndex = getFirstEmptyIndex(chosenOptions, targetSlot);
    if (nextEmptySlotIndex !== undefined) {
      setTargetSlot(nextEmptySlotIndex);
    } else {
      setTargetSlot(targetSlot >= slotsCount - 1 ? 0 : targetSlot + 1);
    }
  };

  const setOptionByCurrentSlot = (color: string) => {
    setChosenOption(targetSlot, color);
    jumpToNextSlot();
  };

  const submitManual = () => {
    if (validResult(manual, slotsCount)) {
      controller.submit(manual);
    } else {
      alert("ניקוד לא חוקי");
      setManual({ black: 0, white: 0 });
    }
  };

  return (
    <main style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <MainCard>
        <button style={{ padding: "10px" }} onClick={() => setUseCheatPanel(!useCheatPanel)}>
          {useCheatPanel ? "X" : "רמי הרמאי >"}
        </button>
        {useCheatPanel && (
          <CheatPanel setSelection={controller.setChosenOptions} options={controller.possibleOptions} />
        )}
      </MainCard>

      <MainCard>
        <FlexColumn>
          <H2 text={`סיבוב מספר ${game.turnCount + 1}`} />
          <Slots chosenOptions={chosenOptions} targetSlot={targetSlot} setTargetSlot={setTargetSlot} />
          <div>
            {settings.vsComputer ? (
              <Button onClick={() => controller.submit()}>נחש</Button>
            ) : (
              <FlexColumn>
                <ScoreInput
                  label="שחורים"
                  value={manual.black}
                  max={slotsCount}
                  onChange={(black) => setManual({ ...manual, black })}
                />
                <ScoreInput
                  label="לבנים"
                  value={manual.white}
                  max={slotsCount}
                  onChange={(white) => setManual({ ...manual, white })}
                />
                <Button onClick={submitManual}>נחש</Button>
              </FlexColumn>
            )}
          </div>
          <HistoryPanel setChosenOption={setChosenOption} rounds={controller.rounds} />
        </FlexColumn>
      </MainCard>
      <MainCard>
        <ColorButtonPalette
          colors={controller.usedColors}
          setOptionByCurrentSlot={setOptionByCurrentSlot}
          jumpToNextSlot={jumpToNextSlot}
        />
      </MainCard>
    </main>
  );
};
