import { Button } from "@chakra-ui/react";
import { EndgameResult } from "../../types/game";
import { MainCard } from "../utils/MainCard";
import { StatsItem } from "./StatsItem";
import Trophy from "/trophy.svg";
import SadIcon from "/sad.svg";
import { CopyButton } from "../utils/CopyButton";
import { charsToColors } from "../../utils/colors";
import { Peg } from "../utils/Peg/Peg";

const MAX_ID_LENGTH = 6;

export const EndScreen = ({
  endgameResult,
  playAgain,
}: {
  endgameResult: EndgameResult;
  playAgain: () => void;
}) => {
  const gameWon = endgameResult.status === "won";
  const { gameId, secretWord } = endgameResult;
  return (
    <main className="EndScreen">
      <MainCard>
        <div className={"EndScreen__banner" + (gameWon ? " EndScreen__banner--won" : "")}>
          <img src={gameWon ? Trophy : SadIcon} alt="" className="EndScreen__icon" />
          <h1>{gameWon ? "ניצחון!" : "הפסדת!"}</h1>
          <p>
            {gameWon
              ? `פיצחת את הרצף ב-${endgameResult.turns} ניסיונות`
              : "נגמרו הניסיונות. בפעם הבאה!"}
          </p>
        </div>

        {secretWord.length > 0 && (
          <div className="EndScreen__secret">
            <span>{"הרצף הסודי"}</span>
            <div className="EndScreen__pegs">
              {charsToColors(secretWord).map((color, index) => (
                <Peg key={index} color={color} />
              ))}
            </div>
          </div>
        )}

        <ul className="EndScreen__stats">
          <StatsItem title="מספר ניסיונות" value={`${endgameResult.turns}/${endgameResult.maxTurns}`} />
          <StatsItem title="מספר צבעים" value={endgameResult.numberOfColors} />
          <StatsItem title="חזרה על צבעים" value={endgameResult.allowRepeats ? "כן" : "לא"} />
          {gameId && (
            <StatsItem title="מזהה משחק">
              <CopyButton value={gameId}>
                {gameId.length <= MAX_ID_LENGTH ? gameId : gameId.slice(0, MAX_ID_LENGTH) + "…"}
              </CopyButton>
            </StatsItem>
          )}
        </ul>

        <div className="EndScreen__actions">
          <Button size="lg" onClick={playAgain}>
            {"שחק שוב"}
          </Button>
          <CopyButton value={JSON.stringify(endgameResult)}>{"ייצא משחק"}</CopyButton>
        </div>
      </MainCard>
    </main>
  );
};
