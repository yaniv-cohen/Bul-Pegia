import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { FlexColumn } from "../utils/FlexColoumn";
import { FlexRow } from "../utils/FlexRow";
import { MainCard } from "../utils/MainCard";
import { StartGameOptions } from "./Options/StartGameOptions";

export const StartHeader = ({
  startGameFunction,
  optionsCount,
  slotsCount,
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
  startGameFunction: Function;
  optionsCount: number;
  maxTurns: number;
  incrementSlotsCount: (arg0: number) => void;
  incrementColorsCount: (arg0: number) => void;
  incrementMaxTurns: (arg0: number) => void;
  allowRepeats: boolean;
  toggleAllowRepeats: () => void;
  vsComputer: boolean;
  setVsComputer: (arg0: boolean) => void;
}) => {
  const [howToPlay, setHowToPlay] = useState<boolean>(false);
  return (
    <MainCard>
      {howToPlay ? (
        <FlexColumn>
          <p style={{ direction: "rtl" }}>
            על כל צבע נכון שנמצא במיקום הנכון ברצף מקבלים "בול" (נקודה שחורה).
          </p>
          <p style={{ direction: "rtl" }}>
            על כל צבע נכון שאיננו נמצא במיקום הנכון ברצף מקבלים "פגיעה" (לבנה).
          </p>
          <p style={{ direction: "rtl" }}>
            כדי להעזר בכלי בזמן משחק הקופסה  הפיזי, יש לבחור באפשרות של "מול אדם".
          </p>
          <p>
            <a
              target="_blank"
              href="https://davidson.weizmann.ac.il/online/mathcircle/articles/%D7%91%D7%95%D7%9C-%D7%A4%D7%92%D7%99%D7%A2%D7%94#:~:text=%D7%A2%D7%9C%20%D7%9B%D7%9C%20%D7%A6%D7%91%D7%A2%20%D7%A0%D7%9B%D7%95%D7%9F%20%D7%A9%D7%A0%D7%9E%D7%A6%D7%90,%22%D7%A9%D7%AA%D7%99%20%D7%A4%D7%92%D7%99%D7%A2%D7%95%D7%AA%22%20%D7%95%D7%9B%D7%95'."
            >
              לקריאת מאמר, שהלוואי שהייתי מכיר לפני הכנת הפרויקט, באתר מכון
              דוידסון
            </a>
          </p>
          <FlexRow>
            <a
              href="https://github.com/yaniv-cohen/Bul-Pegia/tree/live_demo1"
              target={"_blank"}
            >
              <Button width={40}>
                <img
                  className="icon"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
                  }
                  alt="מול מחשב"
                />
              </Button>
              <span className={"rtl"}> API מפתחים - מוזמנים לשחק בעזרת ה </span>
            </a>
          </FlexRow>
          <Button
            onClick={() => {
              setHowToPlay(false);
            }}
          >
            למסך הראשי
          </Button>
        </FlexColumn>
      ) : (
        <>
          <Button
            onClick={() => {
              setHowToPlay(true);
            }}
          >
            הוראות
          </Button>

          <StartGameOptions
            slotsCount={slotsCount}
            colorsCount={optionsCount}
            maxTurns={maxTurns}
            incrementSlotsCount={incrementSlotsCount}
            incrementColorsCount={incrementColorsCount}
            incrementMaxTurns={incrementMaxTurns}
            allowRepeats={allowRepeats}
            toggleAllowRepeats={toggleAllowRepeats}
            vsComputer={vsComputer}
            setVsComputer={setVsComputer}
          />
          <Button
            onClick={() => {
              startGameFunction(true);
            }}
          >
            התחל!
          </Button>
        </>
      )}
    </MainCard>
  );
};
