import { useEffect, useState } from "react";
import "./App.scss";
import { History } from "./types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "./utils/letters";
import { StartHeader } from "./components/StartGame/StartHeader";
import { GameHeader } from "./components/GameHeader/GameHeader";
import { getAllPermutations } from "./utils/getAllPermutations";
import { gernerateOptions } from "./logic/generateOptions";
import axios from "axios";
import { chooseBest } from "./logic/chooseBest";
import { MAXIMUM_COLORS, MAXIMUM_SLOTS, MINIMUN_COLORS, MINIMUN_SLOTS, SERVER_URL } from "./utils/globals";
import { Game } from "./components/Game/Game";
import { GameType } from "./types/Game";

function App() {
  // const [count, setCount] = useState(0);

  //Game options
  const [optionsCount, setOptionsCount] = useState<number>(6);
  const [slotsCount, setSlotsCount] = useState<number>(4);
  const [usedColors, setUsedColors] = useState<Array<string>>(COLOR_LIST.slice(0, optionsCount));
  const [usedLetters, setUsedLetters] = useState<Array<string>>(LETTER_OPTIONS.slice(0, optionsCount));

  //Game States
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [game, setGame] = useState<GameType | undefined>();
  const [history, setHistory] = useState<History>({ rounds: [] });
  const [slots, setSlots] = useState<Array<string[]>>(
    new Array(slotsCount).fill(
      new Array(slotsCount).fill(usedLetters.slice(0, optionsCount))
    )
  );

  //Game actions
  const [chosenOptions, setChosenOptions] = useState<Array<string | null>>(
    new Array(slotsCount).fill(null)
  );

  //Prefrences
  const [resetOnSubmit, setResetOnSubmit] = useState(false);


  //Cheat Logic
  const [allPossibleOptions, setAllPossibleOptions] = useState(
    getAllPermutations(usedLetters.slice(0, optionsCount), slotsCount)
  );

  useEffect(() => {
    setUsedLetters(LETTER_OPTIONS.slice(0, optionsCount))
    setUsedColors(COLOR_LIST.slice(0, optionsCount))
    let options = usedLetters.slice(0, optionsCount);
    setSlots(new Array(slotsCount).fill(options));
  }, [optionsCount]);

  useEffect(() => {
    setSlots(new Array(slotsCount).fill(usedLetters));
  }, [slotsCount]);

  const resetGameState = () => {
    setGameStarted(false);
    setChosenOptions(new Array(slotsCount).fill(null))
    setAllPossibleOptions(getAllPermutations(usedLetters.slice(0, optionsCount), slotsCount))
    setGame(undefined)
    setHistory({ rounds: [] })
  }

  const submit = async (arr: string[]) => {
    let str = "";
    arr.forEach((color) => {
      console.log(color, ' in ', usedColors);
      str += usedLetters[usedColors.indexOf(color)];
    });
    //prevent duplicate guesses
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
      resetGameState()
    }

    const newOptions = gernerateOptions(
      slotsCount,
      usedLetters.slice(0, optionsCount),
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




  const incrementSlotsCount = (direction: number) => {
    const numberInRange = slotsCount + direction
    if (numberInRange <= MAXIMUM_SLOTS && numberInRange >= MINIMUN_SLOTS)
      setSlotsCount(numberInRange)
  }

  const incrementColorsCount = (direction: number) => {
    const numberInRange = optionsCount + direction
    if (numberInRange <= MAXIMUM_COLORS && numberInRange >= MINIMUN_COLORS)
      setOptionsCount(numberInRange)
  }


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
      getAllPermutations(usedLetters.slice(0, optionsCount), slotsCount)
    );
    setHistory({ rounds: [] });
  };
  return (
    <div className="App">
      {/* <BoardBackground /> */}
      <GameHeader toggleResetOnSubmit={toggleResetOnSubmit}
        resetOnSubmit={resetOnSubmit}      >
        {
          !gameStarted ? (
            <StartHeader
              startGameFunction={startGameFunction}
              optionsCount={optionsCount}
              slotsCount={slotsCount}
              incrementSlotsCount={incrementSlotsCount}
              incrementColorsCount={incrementColorsCount}
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
