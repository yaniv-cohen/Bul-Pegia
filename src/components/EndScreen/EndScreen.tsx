import { Button, color } from "@chakra-ui/react";
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
import { ColoredCirclesFromArray } from "../utils/ColoredCirclesFromArray";
import { COLOR_LIST } from "../../utils/letters";
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
            <ColoredCirclesFromArray colorsCount={endgameResult?.numberOfColors??0} colorList={charsToColors((endgameResult?.secretWord + "").split(","))}/>
          </StatsItem>
          <StatsItem
            title={"מספר ניסיונות"}
            value={endgameResult?.turns + "/" + endgameResult?.maxTurns}
          ></StatsItem>
          <StatsItem
            title={"מספר צבעים"}
            value={ColoredCirclesFromArray({colorsCount:endgameResult?.numberOfColors??0,colorList:COLOR_LIST})}
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
