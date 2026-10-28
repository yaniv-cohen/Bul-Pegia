import { Button } from "@chakra-ui/react";
import { FlexColumn } from "../../utils/FlexColumn";
import { Option } from "./Option";
import { SwitchRect } from "../../utils/Switch";
import { FlexRow } from "../../utils/FlexRow";
import ComputerIcon from "/computer.svg";
import PersonIcon from "/person.svg";
import { ButtonColumn } from "../../utils/Buttons/ButtonColumn";
import { GameController } from "../../../hooks/useGame";

const Stepper = ({ onStep }: { onStep: (direction: number) => void }) => (
  <div>
    <Button onClick={() => onStep(1)}>+</Button>
    <Button onClick={() => onStep(-1)}>-</Button>
  </div>
);

export const StartGameOptions = ({ controller }: { controller: GameController }) => {
  const { slotsCount, colorsCount, maxTurns, allowRepeats, vsComputer } = controller.settings;
  return (
    <FlexColumn>
      <Option text="מספר מקומות" currentValue={slotsCount}>
        <Stepper onStep={controller.incrementSlotsCount} />
      </Option>
      <Option text="מספר צבעים" currentValue={colorsCount}>
        <Stepper onStep={controller.incrementColorsCount} />
      </Option>
      <Option text="מספר ניסיונות:" currentValue={maxTurns}>
        <Stepper onStep={controller.incrementMaxTurns} />
      </Option>
      <Option text="חזרה על צבעים" currentValue={allowRepeats ? "כן" : "לא"}>
        <div>
          <SwitchRect value={allowRepeats} toggleFunction={controller.toggleAllowRepeats} />
        </div>
      </Option>
      <FlexRow>
        <ButtonColumn
          onClick={() => controller.setVsComputer(true)}
          className={vsComputer ? "selectedEnemy" : undefined}
        >
          <h2>{"מול מחשב"}</h2>
          <img className="enemy-icon" src={ComputerIcon} alt="" />
        </ButtonColumn>
        <ButtonColumn
          onClick={() => controller.setVsComputer(false)}
          className={vsComputer ? undefined : "selectedEnemy"}
        >
          <h2>{"מול אדם"}</h2>
          <img className="enemy-icon" src={PersonIcon} alt="" />
        </ButtonColumn>
      </FlexRow>
    </FlexColumn>
  );
};
