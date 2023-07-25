import { Button } from "@chakra-ui/react";
import { EndgameResult } from "../../types/EndgameResult";
import { GameState } from "../../types/Game";
import { MainCard } from "../utils/MainCard";
import { StatsItem } from "./StatsItem";
import Tropy from "/trophy.svg";
import SadIcon from "/sad.svg";
import { CopyButton } from "../utils/CopyButton";
import { charsToColors } from "../../logic/charsToColors";
import { FlexColUl } from "../utils/FlexColUl";
import { FlexColumn } from "../utils/FlexColoumn";
import { FlexRow } from "../utils/FlexRow";
export const EndScreen = ({
  endgameResult,
  setGameState,
}: {
  endgameResult?: EndgameResult;
  setGameState: (arg0: GameState) => void;
}) => {
  const gameWon = endgameResult?.status === "won";
  return (
    <main>
      {/* {JSON.stringify(endgameResult?.numberOfColors) + "\n"} */}
      <MainCard>
        <FlexRow className="spaced-rtl">
          <h1 className="H2 spaced-around-rtl">
            {gameWon ? "ניצחון!" : "הפסדת!"}
          </h1>

          <img
            src={gameWon ? Tropy : SadIcon}
            alt="גביע ניצחון"
            className="win_loss_image"
          />
        </FlexRow>
        <FlexColUl>
          <StatsItem title="הרצף הסודי">
            {charsToColors((endgameResult?.secretWord + "").split(",")).map(
              (color, index) => {
                return (
                  <span key={color + index} className={"color-result " + color}>
                    {
                      //   color
                      (color + "").slice(0, 3)
                    }
                  </span>
                );
              }
            )}
          </StatsItem>
          <StatsItem
            title={"מספר ניסיונות"}
            value={endgameResult?.turns + "/" + endgameResult?.maxTurns}
          ></StatsItem>
          <StatsItem
            title={"מספר צבעים"}
            value={endgameResult?.numberOfColors}
          ></StatsItem>
          <StatsItem
            title={"חזרה על צבעים"}
            value={endgameResult?.allowRepeats ? "כן" : "לא"}
          ></StatsItem>
          <StatsItem title={"מזהה משחק"}>
            {endgameResult?.gameId ? (
              <CopyButton value={endgameResult?.gameId + ""}>
                {endgameResult?.gameId ?? "".length <= 6
                  ? endgameResult?.gameId
                  : endgameResult?.gameId.slice(0, 6) + "... "}
              </CopyButton>
            ) : undefined}
          </StatsItem>
        </FlexColUl>
        <FlexColumn>
          <div>
            <Button
              onClick={() => {
                setGameState("start");
              }}
            >
              {"שחק שוב"}
            </Button>
          </div>
          <div>
            <CopyButton value={JSON.stringify(endgameResult)}>
              {"ייצא משחק"}
            </CopyButton>
          </div>
        </FlexColumn>
      </MainCard>
    </main>
  );
};
