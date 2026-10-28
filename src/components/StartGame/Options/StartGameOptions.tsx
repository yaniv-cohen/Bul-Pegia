import { IconButton, Switch } from "@chakra-ui/react";
import { Option } from "./Option";
import ComputerIcon from "/computer.svg";
import PersonIcon from "/person.svg";
import { GameController } from "../../../hooks/useGame";

const Stepper = ({
  label,
  value,
  onStep,
}: {
  label: string;
  value: number;
  onStep: (direction: number) => void;
}) => (
  <div className="Stepper" role="group" aria-label={label}>
    <IconButton
      aria-label={`הוסף ${label}`}
      icon={<span aria-hidden>+</span>}
      size="sm"
      variant="outline"
      onClick={() => onStep(1)}
    />
    <output className="Stepper__value" aria-live="polite">
      {value}
    </output>
    <IconButton
      aria-label={`הפחת ${label}`}
      icon={<span aria-hidden>−</span>}
      size="sm"
      variant="outline"
      onClick={() => onStep(-1)}
    />
  </div>
);

const ModeCard = ({
  selected,
  icon,
  title,
  description,
  onSelect,
}: {
  selected: boolean;
  icon: string;
  title: string;
  description: string;
  onSelect: () => void;
}) => (
  <button
    type="button"
    role="radio"
    aria-checked={selected}
    className={"ModeCard" + (selected ? " ModeCard--selected" : "")}
    onClick={onSelect}
  >
    <img src={icon} alt="" />
    <strong>{title}</strong>
    <span>{description}</span>
  </button>
);

export const StartGameOptions = ({ controller }: { controller: GameController }) => {
  const { slotsCount, colorsCount, maxTurns, allowRepeats, vsComputer } = controller.settings;
  return (
    <div className="StartOptions">
      <div className="ModePicker" role="radiogroup" aria-label="סוג משחק">
        <ModeCard
          selected={vsComputer}
          icon={ComputerIcon}
          title="מול מחשב"
          description="המחשב בוחר רצף סודי"
          onSelect={() => controller.setVsComputer(true)}
        />
        <ModeCard
          selected={!vsComputer}
          icon={PersonIcon}
          title="מול אדם"
          description="עזרה במשחק קופסה אמיתי"
          onSelect={() => controller.setVsComputer(false)}
        />
      </div>
      <Option text="מספר מקומות">
        <Stepper label="מקומות" value={slotsCount} onStep={controller.incrementSlotsCount} />
      </Option>
      <Option text="מספר צבעים">
        <Stepper label="צבעים" value={colorsCount} onStep={controller.incrementColorsCount} />
      </Option>
      <Option text="מספר ניסיונות">
        <Stepper label="ניסיונות" value={maxTurns} onStep={controller.incrementMaxTurns} />
      </Option>
      <Option text="חזרה על צבעים">
        <Switch
          size="lg"
          isChecked={allowRepeats}
          onChange={controller.toggleAllowRepeats}
          aria-label="חזרה על צבעים"
        />
      </Option>
    </div>
  );
};
