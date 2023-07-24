import { Button } from "@chakra-ui/react";
import { FlexColumn } from "../../utils/FlexColoumn";
import { Option } from "./Option";
import { SwitchRect } from "../../utils/Switch";
import { FlexRow } from "../../utils/FlexRow";
import ComputerIcon from "../../../assets/computer.svg";
import PersonIcon from "../../../assets/person.svg";
import { ButtonColoumn } from "../../utils/Buttons/ButtonColoumn";

export const StartGameOptions = ({
  slotsCount,
  colorsCount,
  maxTurns,
  incrementSlotsCount,
  incrementColorsCount,
  incrementMaxTurns,
  allowRepeats,
  toggleAllowRepeats,
  vsComputer,
  setVsComputer,
}: {
  slotsCount: number;
  colorsCount: number;
  maxTurns: number;
  incrementSlotsCount: (arg0: number) => void;
  incrementColorsCount: (arg0: number) => void;
  incrementMaxTurns: (arg0: number) => void;
  allowRepeats: boolean;
  toggleAllowRepeats: () => void;
  vsComputer: boolean;
  setVsComputer: (arg0: boolean) => void;
}) => (
  <FlexColumn>
    <Option text={`מספר מקומות`} currentValue={slotsCount}>
      <div>
        <Button
          onClick={() => {
            incrementSlotsCount(1);
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            incrementSlotsCount(-1);
          }}
        >
          -
        </Button>
      </div>
    </Option>
    <Option text={`מספר צבעים`} currentValue={colorsCount}>
      <div>
        <Button
          onClick={() => {
            console.log(incrementColorsCount);

            incrementColorsCount(1);
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            console.log("minus");

            incrementColorsCount(-1);
          }}
        >
          -
        </Button>
      </div>
    </Option>
    <Option text={`מספר ניסיונות:`} currentValue={maxTurns}>
      <div>
        <Button
          onClick={() => {
            incrementMaxTurns(1);
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            incrementMaxTurns(-1);
          }}
        >
          -
        </Button>
      </div>
    </Option>
    <Option text={`חזרה על צבעים`} currentValue={allowRepeats ? "כן" : "לא"}>
      <div>
        <SwitchRect
          value={allowRepeats}
          toggleFunction={toggleAllowRepeats}
        ></SwitchRect>
      </div>
    </Option>
    <FlexRow>
      <ButtonColoumn
        fn={() => setVsComputer(true)}
        className={vsComputer ? "selectedEnemy" : undefined}
      >
        <h2>{"מול מחשב"}</h2>
        <img className="enemy-icon" src={ComputerIcon} alt="מול מחשב" />
      </ButtonColoumn>
      <ButtonColoumn
        fn={() => setVsComputer(false)}
        className={vsComputer ? undefined : "selectedEnemy"}
      >
        <h2> {"מול אדם"}</h2>
        <img className={"enemy-icon"} src={PersonIcon} alt="מול אדם" />
      </ButtonColoumn>
    </FlexRow>
  </FlexColumn>
);
