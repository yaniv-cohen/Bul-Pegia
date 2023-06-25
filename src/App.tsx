import { useEffect, useState } from "react";
import "./App.scss";
import { History } from "./types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "./utils/letters";
import { StartHeader } from "./components/StartHeader";
import { GameHeader } from "./components/GameHeader/GameHeader";
import { getAllPermutations } from "./utils/getAllPermutations";
import { gernerateOptions } from "./logic/generateOptions";
import axios from "axios";
import { chooseBest } from "./logic/chooseBest";
import { SERVER_URL } from "./utils/globals";
import { BoardBackground } from "./components/GameHeader/BoardBackground/BoardBackground";
import { Game } from "./components/Game/Game";
import { GameType } from "./types/Game";

function App() {
  const [count, setCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [optionsCount, setOptionsCount] = useState(6);
  const [slotsCount, setSlotsCount] = useState(4);
  const [chosenOptions, setChosenOptions] = useState(
    new Array(slotsCount).fill(null)
  );
  const [resetOnSubmit, setResetOnSubmit] = useState(false);
  const [slots, setSlots] = useState<Array<string[]>>(
    new Array(slotsCount).fill(
      new Array(slotsCount).fill(LETTER_OPTIONS.slice(0, optionsCount))
    )
  );
  const [allPossibleOptions, setAllPossibleOptions] = useState(
    getAllPermutations(LETTER_OPTIONS.slice(0, optionsCount), slotsCount)
  );

  const [game, setGame] = useState<GameType | undefined>();
  const [history, setHistory] = useState<History>({ rounds: [] });
  const submit = async (arr: string[]) => {
    let str = "";
    arr.forEach((color) => {
      str += LETTER_OPTIONS[COLOR_LIST.indexOf(color)];
    });
    for (const round of history.rounds) {
      if (round.input === str) {
        setChosenOptions(new Array(slotsCount).fill(""));
        return;
      }
    }

    const url = `${SERVER_URL}/game/${game?.game_id}/guess/` + str;
    console.log(`fetch to ` + url);
    const result = await (await fetch(url)).json();
    setHistory({
      rounds: [
        ...history.rounds,
        {
          input: str,
          output: { black: result.result.black, white: result.result.white },
        },
      ],
    });
    if (result.result.black === slotsCount) {
      alert("you won!");
      setGameStarted(false);
    }

    const newOptions = gernerateOptions(
      slotsCount,
      LETTER_OPTIONS.slice(0, optionsCount),
      str.split(""),
      result.result,
      allPossibleOptions
    );

    const [bestIndex, bestOption] = chooseBest(newOptions);

    setAllPossibleOptions([bestOption, ...newOptions.slice(0, bestIndex), ...newOptions.slice(bestIndex + 1,)]);

    if (resetOnSubmit) {
      setChosenOptions(new Array(slotsCount).fill(null));
    }
  };

  useEffect(() => {
    let options = LETTER_OPTIONS.slice(0, optionsCount);
    setSlots(new Array(slotsCount).fill(options));
  }, [optionsCount]);
  useEffect(() => {
    let options = LETTER_OPTIONS.slice(0, optionsCount);
    setSlots(new Array(slotsCount).fill(options));
  }, [slotsCount]);

  const setChosenOption = (index: number, value: string) => {
    const newArr = [...chosenOptions];
    newArr[index] = value;
    setChosenOptions(newArr);
  };

  const toggleResetOnSubmit = () => {
    setResetOnSubmit(!resetOnSubmit);
  };
  const startGameFunction = async () => {
    const url = `${SERVER_URL}/createNewGame/${slotsCount}/${optionsCount}`;
    console.log(`fetch to ` + url);
    const result = (await axios.get(url)).data;

    setGame({ game_id: result, remainingTurns: 1, turnCount: 1 });
    setGameStarted(true);
    setAllPossibleOptions(
      getAllPermutations(LETTER_OPTIONS.slice(0, optionsCount), slotsCount)
    );
    setHistory({ rounds: [] });
  };
  return (
    <div className="App">
      <BoardBackground />
      <GameHeader toggleResetOnSubmit={toggleResetOnSubmit}
        resetOnSubmit={resetOnSubmit}      >
        {
          !gameStarted ? (
            <StartHeader
              startGameFunction={startGameFunction}
              optionsCount={optionsCount}
              slotsCount={slotsCount}
              setSlotsCount={setSlotsCount}
            />
          )
            :
            <Game allPossibleOptions={allPossibleOptions}
              chosenOptions={chosenOptions}
              history={history}
              game={game as GameType}
              setChosenOptions={setChosenOptions}
              slots={slots}
              submit={submit}
              setChosenOption={setChosenOption}
            />
        }
      </GameHeader>
    </div>
  );
}
export default App;
