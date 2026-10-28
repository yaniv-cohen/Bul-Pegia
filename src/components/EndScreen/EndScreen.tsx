import { Button } from "@chakra-ui/react";
import { EndgameResult } from "../../types/game";
import { MainCard } from "../utils/MainCard";
import { StatsItem } from "./StatsItem";
import Trophy from "/trophy.svg";
import SadIcon from "/sad.svg";
import { CopyButton } from "../utils/CopyButton";
import { charsToColors } from "../../utils/colors";
import { FlexColUl } from "../utils/FlexColUl";
import { FlexColumn } from "../utils/FlexColumn";
import { FlexRow } from "../utils/FlexRow";

const MAX_ID_LENGTH = 6;

export const EndScreen = ({
  endgameResult,
  playAgain,
}: {
  endgameResult: EndgameResult;
  playAgain: () => void;
}) => {
  const gameWon = endgameResult.status === "won";
  const { gameId } = endgameResult;
  return (
    <main>
      <MainCard>
        <FlexRow className="spaced-rtl">
          <h1 className="H2 spaced-around-rtl">{gameWon ? "ניצחון!" : "הפסדת!"}</h1>
          <img src={gameWon ? Trophy : SadIcon} alt="" className="win_loss_image" />
        </FlexRow>
        <FlexColUl>
          {endgameResult.secretWord.length > 0 && (
            <StatsItem title="הרצף הסודי">
              {charsToColors(endgameResult.secretWord).map((color, index) => (
                <span key={color + index} className={"color-result " + color}>
                  {color.slice(0, 3)}
                </span>
              ))}
            </StatsItem>
          )}
          <StatsItem title="מספר ניסיונות" value={`${endgameResult.turns}/${endgameResult.maxTurns}`} />
          <StatsItem title="מספר צבעים" value={endgameResult.numberOfColors} />
          <StatsItem title="חזרה על צבעים" value={endgameResult.allowRepeats ? "כן" : "לא"} />
          {gameId && (
            <StatsItem title="מזהה משחק">
              <CopyButton value={gameId}>
                {gameId.length <= MAX_ID_LENGTH ? gameId : gameId.slice(0, MAX_ID_LENGTH) + "... "}
              </CopyButton>
            </StatsItem>
          )}
        </FlexColUl>
        <FlexColumn>
          <div>
            <Button onClick={playAgain}>{"שחק שוב"}</Button>
          </div>
          <div>
            <CopyButton value={JSON.stringify(endgameResult)}>{"ייצא משחק"}</CopyButton>
          </div>
        </FlexColumn>
      </MainCard>
    </main>
  );
};
