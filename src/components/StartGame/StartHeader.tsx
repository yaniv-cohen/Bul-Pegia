import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FlexColumn } from "../utils/FlexColumn";
import { FlexRow } from "../utils/FlexRow";
import { MainCard } from "../utils/MainCard";
import { StartGameOptions } from "./Options/StartGameOptions";
import { GameController } from "../../hooks/useGame";

export const StartHeader = ({ controller }: { controller: GameController }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const startGame = async () => {
    setLoading(true);
    try {
      await controller.startGame();
    } catch {
      toast({ status: "error", title: "השרת לא זמין, נסה שוב בעוד רגע" });
    } finally {
      setLoading(false);
    }
  };
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
              rel="noreferrer"
              href="https://davidson.weizmann.ac.il/online/mathcircle/articles/%D7%91%D7%95%D7%9C-%D7%A4%D7%92%D7%99%D7%A2%D7%94#:~:text=%D7%A2%D7%9C%20%D7%9B%D7%9C%20%D7%A6%D7%91%D7%A2%20%D7%A0%D7%9B%D7%95%D7%9F%20%D7%A9%D7%A0%D7%9E%D7%A6%D7%90,%22%D7%A9%D7%AA%D7%99%20%D7%A4%D7%92%D7%99%D7%A2%D7%95%D7%AA%22%20%D7%95%D7%9B%D7%95'."
            >
              לקריאת מאמר, שהלוואי שהייתי מכיר לפני הכנת הפרויקט, באתר מכון
              דוידסון
            </a>
          </p>
          <FlexRow>
            <a
              href="https://github.com/yaniv-cohen/Bul-Pegia/tree/live_demo1"
              target="_blank"
              rel="noreferrer"
            >
              <Button width={40}>
                <img
                  className="icon"
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/2048px-Octicons-mark-github.svg.png"
                  }
                  alt="GitHub"
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

          <StartGameOptions controller={controller} />
          {!controller.settingsValid && (
            <p className="rtl">{"בלי חזרה על צבעים, מספר הצבעים חייב להיות לפחות כמספר המקומות"}</p>
          )}
          <Button
            onClick={startGame}
            isLoading={loading}
            isDisabled={!controller.settingsValid}
          >
            התחל!
          </Button>
        </>
      )}
    </MainCard>
  );
};
