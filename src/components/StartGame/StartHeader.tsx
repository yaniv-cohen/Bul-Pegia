import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { MainCard } from "../utils/MainCard";
import { StartGameOptions } from "./Options/StartGameOptions";
import { GameController } from "../../hooks/useGame";

const ARTICLE_URL =
  "https://davidson.weizmann.ac.il/online/mathcircle/articles/%D7%91%D7%95%D7%9C-%D7%A4%D7%92%D7%99%D7%A2%D7%94";
const REPO_URL = "https://github.com/yaniv-cohen/Bul-Pegia/tree/live_demo1";

const HowToPlay = ({ onBack }: { onBack: () => void }) => (
  <div className="HowToPlay">
    <h2>{"איך משחקים?"}</h2>
    <p>{"צריך לגלות את הרצף הסודי של הצבעים. אחרי כל ניחוש מקבלים רמז:"}</p>
    <ul>
      <li>
        <span className="KeyPeg KeyPeg--black" aria-hidden />
        {"בול (שחור) - צבע נכון במקום הנכון."}
      </li>
      <li>
        <span className="KeyPeg KeyPeg--white" aria-hidden />
        {"פגיעה (לבן) - צבע נכון במקום אחר."}
      </li>
    </ul>
    <p>{'משחקים בקופסה אמיתית? בחרו "מול אדם" והזינו את הניקוד שהיריב נותן.'}</p>
    <p>
      <a href={ARTICLE_URL} target="_blank" rel="noreferrer">
        {"לקריאת מאמר, שהלוואי שהייתי מכיר לפני הכנת הפרויקט, באתר מכון דוידסון"}
      </a>
    </p>
    <p>
      <a href={REPO_URL} target="_blank" rel="noreferrer">
        {"מפתחים? מוזמנים לשחק דרך ה-API בגיטהאב"}
      </a>
    </p>
    <Button onClick={onBack} variant="outline">
      {"חזרה"}
    </Button>
  </div>
);

export const StartHeader = ({ controller }: { controller: GameController }) => {
  const [loading, setLoading] = useState(false);
  const [howToPlay, setHowToPlay] = useState(false);
  const toast = useToast();

  const startGame = async () => {
    setLoading(true);
    try {
      await controller.startGame();
    } catch {
      toast({ status: "error", title: "השרת לא זמין, נסה שוב בעוד רגע", position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="StartScreen">
      <MainCard>
        {howToPlay ? (
          <HowToPlay onBack={() => setHowToPlay(false)} />
        ) : (
          <>
            <div className="StartScreen__header">
              <h1>{"משחק חדש"}</h1>
              <Button variant="link" onClick={() => setHowToPlay(true)}>
                {"איך משחקים?"}
              </Button>
            </div>
            <StartGameOptions controller={controller} />
            {!controller.settingsValid && (
              <p className="StartScreen__error" role="alert">
                {"בלי חזרה על צבעים, מספר הצבעים חייב להיות לפחות כמספר המקומות"}
              </p>
            )}
            <Button
              size="lg"
              width="100%"
              onClick={startGame}
              isLoading={loading}
              loadingText="מתחבר לשרת..."
              isDisabled={!controller.settingsValid}
            >
              {"התחל!"}
            </Button>
          </>
        )}
      </MainCard>
    </main>
  );
};
