import { background, Button, color } from "@chakra-ui/react";
import { useState } from "react";
import { FlexColumn } from "../utils/FlexColoumn";
import { FlexRow } from "../utils/FlexRow";
import { MainCard } from "../utils/MainCard";
import { StartGameOptions } from "./Options/StartGameOptions";

type StartHeaderProps = {
  slotsCount: number;
  startGameFunction: (start: boolean) => void;
  optionsCount: number;
  maxTurns: number;
  incrementSlotsCount: (arg0: number) => void;
  incrementColorsCount: (arg0: number) => void;
  incrementMaxTurns: (arg0: number) => void;
  allowRepeats: boolean;
  toggleAllowRepeats: () => void;
  vsComputer: boolean;
  setVsComputer: (arg0: boolean) => void;
};

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
}: StartHeaderProps) => {
  const [moreInfo, setMoreInfo] = useState<boolean>(false);
  return (
    <MainCard>
      {
        <FlexColumn>
          <div
            style={{
              marginBottom: 16,
              background: "#f6f8fa",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <h2>הוראות</h2>
            <p style={{ direction: "rtl" }}>
              על כל צבע נכון שנמצא במיקום הנכון ברצף מקבלים "בול" (נקודה שחורה).
            </p>
            <p style={{ direction: "rtl" }}>
              על כל צבע נכון שאיננו נמצא במיקום הנכון ברצף מקבלים "פגיעה"
              (לבנה).
            </p>
            <p style={{ direction: "rtl" }}>
              כדי להעזר בכלי בזמן משחק הקופסה הפיזי, יש לבחור באפשרות של "מול
              אדם".
            </p>
          </div>

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
          <FlexColumn>
            <Button onClick={() => setMoreInfo(!moreInfo)} mb={2}>
              {moreInfo ? "פחות מידע" : "עוד מידע"}
            </Button>
            {moreInfo && (
              <MainCard>
                <FlexColumn>
                  <a
                    href="https://github.com/yaniv-cohen/Bul-Pegia/tree/live_demo1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Button width={40} mr={2}>
                      <img
                        className="icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
                        alt="GitHub"
                        style={{ width: 24, height: 24 }}
                      />
                    </Button>
                    <span className="rtl">
                      <p>המשחק בנוי ממ Front-End ו Back-End נפרדים</p>
                      <p>
                        הכנתי API ציבורי אם הייתם רוצים לעקוף את האלגוריתם שלי
                      </p>
                    </span>
                  </a>
                  <p style={{ direction: "rtl", maxWidth: 400 }}>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://davidson.weizmann.ac.il/online/mathcircle/articles/%D7%91%D7%95%D7%9C-%D7%A4%D7%92%D7%99%D7%A2%D7%94#:~:text=%D7%A2%D7%9C%20%D7%9B%D7%9C%20%D7%A6%D7%91%D7%A2%20%D7%A0%D7%9B%D7%95%D7%9F%20%D7%A9%D7%A0%D7%9E%D7%A6%D7%90,%22%D7%A9%D7%AA%D7%99%20%D7%A4%D7%92%D7%99%D7%A2%D7%95%D7%AA%22%20%D7%95%D7%9B%D7%95'."
                    >
                      לקריאת מאמר, שהלוואי שהייתי מכיר לפני הכנת הפרויקט, באתר
                      מכון דוידסון
                    </a>
                  </p>
                </FlexColumn>
              </MainCard>
            )}
          </FlexColumn>
        </FlexColumn>
      }
    </MainCard>
  );
};
