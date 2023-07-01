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
import { GameState, GameType, GuessResult } from "./types/Game";
import { getAllNonRepeatingPermutations } from "./utils/getAllNonRepeatingPermutations";
import { EndScreen } from "./components/EndScreen/EndScreen";
import { EndgameResult } from "./types/EndgameResult";

function App() {
  // const [count, setCount] = useState(0);

  //Game options
  const [optionsCount, setOptionsCount] = useState<number>(6);
  const [slotsCount, setSlotsCount] = useState<number>(4);
  const [maxTurns, setMaxTurns] = useState<number>(10);
  const [allowRepeats, setAllowRepeats] = useState<boolean>(true);
  const [usedColors, setUsedColors] = useState<Array<string>>(COLOR_LIST.slice(0, optionsCount));
  const [usedLetters, setUsedLetters] = useState<Array<string>>(LETTER_OPTIONS.slice(0, optionsCount));

  //Game States
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>("start");
  const [endgameResult, setEndgameResult] = useState<EndgameResult | undefined>();
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

  const resetGameState = (state: GameState) => {
    setGameState(state)
    setChosenOptions(new Array(slotsCount).fill(null))
    setAllPossibleOptions(getAllPermutations(usedLetters.slice(0, optionsCount), slotsCount))
    setGame(undefined)
    setHistory({ rounds: [] })
  }

  const toggleAllowRepeats = () => {
    setAllowRepeats(!allowRepeats)
  }
  const incrementMaxTurns = (dir: number) => {
    setMaxTurns(Math.min(Math.max(maxTurns + dir, 1), 20))
  }


  const submit = async (arr: string[]) => {
    let str = "";
    if (!arr.every((cell) => {
      console.log("checking " + cell);

      return cell && cell !== 'undefined'
    })) {
      return
    }
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
    const result = await (await fetch(url)).json() as GuessResult;
    setHistory({
      rounds: [
        ...history.rounds,
        {
          input: str,
          output: { black: result.result.black, white: result.result.white },
        },
      ],
    });
    console.log(result);

    if (result.status === "won" || result.status === "lost") {
      setGameState("finished")
      if (result.status === "won") {
        setTimeout(() => {
          alert("you won!");
          setEndgameResult({
            gameId: result.game_id,
            history: history,
            maxTurns:
              result.turns,
            turns: result.turns,
            status: result.status === "won" ? "win" : "loss"
          })
        }, 500)
      }
      else {
        setTimeout(() => {
          alert("you lost!");
          setEndgameResult({
            gameId: result.game_id,
            history: history,
            maxTurns:
              result.turns,
            turns: result.turns,
            status: result.status === "won" ? "win" : "loss"
          })
        }, 500)
      }
      console.log(result);
      console.log(gameState);

      resetGameState("finished")
    }

    setGame({
      ...game!,
      turnCount: result.turns
    })
    const newOptions = await gernerateOptions(
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
    const url = `${SERVER_URL}/createNewGame/${slotsCount}/${optionsCount}/${allowRepeats ? '1' : '0'}/${maxTurns}`;
    // const url = `${SERVER_URL}/createNewGame/${slotsCount}/${optionsCount}`;

    console.log(`fetch to ` + url);
    const result = (await axios.get(url)).data;

    setGame({ game_id: result, remainingTurns: result.MAX_GUESS, turnCount: 0 });
    setGameStarted(true);
    setGameState("active")
    if (allowRepeats === true) {
      setAllPossibleOptions(
        getAllPermutations(usedLetters.slice(0, optionsCount), slotsCount)
      );
    }
    else {

      setAllPossibleOptions(
        getAllNonRepeatingPermutations(usedLetters.slice(0, optionsCount), slotsCount)
      );
    };
    setHistory({ rounds: [] });
  }
  return (
    <div className="App">
      {/* <BoardBackground /> */}
      <GameHeader toggleResetOnSubmit={toggleResetOnSubmit}
        resetOnSubmit={resetOnSubmit}      >
        {
          gameState === "start" ? (
            <StartHeader
              startGameFunction={startGameFunction}
              optionsCount={optionsCount}
              slotsCount={slotsCount}
              maxTurns={maxTurns}
              incrementSlotsCount={incrementSlotsCount}
              incrementColorsCount={incrementColorsCount}
              incrementMaxTurns={incrementMaxTurns}
              allowRepeats={allowRepeats}
              toggleAllowRepeats={toggleAllowRepeats}
            />
          )
            :
            (
              gameState === "active" ? (
                <Game
                  usedColors={usedColors} allPossibleOptions={allPossibleOptions}
                  chosenOptions={chosenOptions}
                  history={history}
                  game={game as GameType}
                  setChosenOptions={setChosenOptions}
                  slots={slots}
                  submit={submit}
                  setChosenOption={setChosenOption}
                />
              ) : (
                <EndScreen setGameState={setGameState} endgameResult={undefined} />
              )
            )

        }
      </GameHeader>
    </div>
  );
}
export default App;
