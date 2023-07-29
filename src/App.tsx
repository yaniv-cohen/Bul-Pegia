import { useEffect, useState } from "react";
import "./App.scss";
import { History, Result } from "./types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "./utils/letters";
import { StartHeader } from "./components/StartGame/StartHeader";
import { GameHeader } from "./components/GameHeader/GameHeader";
import { getAllPermutations } from "./utils/getAllPermutations";
import { gernerateOptions } from "./logic/generateOptions";
import axios from "axios";
import { chooseBest } from "./logic/chooseBest";
import {
  MAXIMUM_COLORS,
  MAXIMUM_SLOTS,
  MINIMUN_COLORS,
  MINIMUN_SLOTS,
  SERVER_URL,
} from "./globals";
import { Game } from "./components/Game/Game";
import {
  EndGameResponse,
  GameState,
  GameType,
  GuessResponse,
} from "./types/Game";
import { getAllNonRepeatingPermutations } from "./utils/getAllNonRepeatingPermutations";
import { EndScreen } from "./components/EndScreen/EndScreen";
import { EndgameResult } from "./types/EndgameResult";
import { getValidGuess } from "./logic/getValiGuess";
import {
  getGuessResponseFromServer,
  getGuessResponseFromUser,
} from "./logic/getGuessResponse";
import { getNewPermutations } from "./utils/getNewPremutation";

function App() {
  //Game options
  const [optionsCount, setOptionsCount] = useState<number>(6);
  const [slotsCount, setSlotsCount] = useState<number>(4);
  const [maxTurns, setMaxTurns] = useState<number>(10);
  const [allowRepeats, setAllowRepeats] = useState<boolean>(true);
  const [vsComputer, setVsComputer] = useState<boolean>(true);
  const [usedColors, setUsedColors] = useState<Array<string>>(
    COLOR_LIST.slice(0, optionsCount)
  );
  const [usedLetters, setUsedLetters] = useState<Array<string>>(
    LETTER_OPTIONS.slice(0, optionsCount)
  );

  //Game States
  const [gameState, setGameState] = useState<GameState>("start");
  const [endgameResult, setEndgameResult] = useState<EndgameResult | undefined>(
    undefined
  );
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
  const [allPossibleOptions, setAllPossibleOptions] = useState<string[][]>(
    getNewPermutations(
      getAllPermutations(usedLetters.slice(0, optionsCount), slotsCount)
    )
  );

  useEffect(() => {
    setUsedLetters(LETTER_OPTIONS.slice(0, optionsCount));
    setUsedColors(COLOR_LIST.slice(0, optionsCount));
    let options = usedLetters.slice(0, optionsCount);
    setSlots(new Array(slotsCount).fill(options));
  }, [optionsCount]);

  useEffect(() => {
    setSlots(new Array(slotsCount).fill(usedLetters));
  }, [slotsCount]);


  const toggleAllowRepeats = () => {
    setAllowRepeats(!allowRepeats);
  };
  const incrementMaxTurns = (dir: number) => {
    setMaxTurns(Math.min(Math.max(maxTurns + dir, 1), 20));
  };

  const submit = async (arr: string[], manualInput?: Result) => {
    const guessAsChars = getValidGuess(arr, usedLetters, usedColors);
    if (!guessAsChars) {
      return;
    }
    //prevent duplicate guesses
    for (const round of history.rounds) {
      if (round.input === guessAsChars) {
        setChosenOptions(new Array(slotsCount).fill(""));
        return;
      }
    }
    let result: EndGameResponse | GuessResponse;
    if (manualInput && !vsComputer) {
      result = getGuessResponseFromUser(
        guessAsChars,
        game,
        manualInput,
        slotsCount,
        allowRepeats,
        optionsCount,
        maxTurns
      );
    } else {
      result = await getGuessResponseFromServer(guessAsChars, game, SERVER_URL);
    }

    setHistory({
      rounds: [
        ...history.rounds,
        {
          input: guessAsChars,
          output: { black: result.result.black, white: result.result.white },
        },
      ],
    });

    if (result.status === "won" || result.status === "lost") {
      setGameState("finished");
      if (result.status === "won") {
        setEndgameResult({
          gameId: result.gameId,
          history: history,
          secretWord: result.secretWord,
          allowRepeats: result.allowRepeats === "1",
          numberOfColors: result.numberOfColors,
          maxTurns: result.maxTurns,
          turns: result.turns,
          status: result.status,
        });
      } else {
        setEndgameResult({
          gameId: result.gameId,
          history: history,
          secretWord: result.secretWord,
          maxTurns: result.turns,
          allowRepeats: result.allowRepeats === "1",
          numberOfColors: result.numberOfColors,
          turns: result.turns,
          status: result.status,
        });
      }
    }

    setGame({
      ...game!,
      turnCount: result.turns,
    });
    const newOptions = await gernerateOptions(
      slotsCount,
      usedLetters.slice(0, optionsCount),
      guessAsChars.split(""),
      result.result,
      allPossibleOptions
    );
    const [bestIndex, bestOption] = chooseBest(newOptions);

    setAllPossibleOptions([
      bestOption,
      ...newOptions.slice(0, bestIndex),
      ...newOptions.slice(bestIndex + 1),
    ]);

    if (resetOnSubmit) {
      setChosenOptions(new Array(slotsCount).fill(null));
    }
  };

  const incrementSlotsCount = (direction: number) => {
    const numberInRange = slotsCount + direction;
    if (numberInRange <= MAXIMUM_SLOTS && numberInRange >= MINIMUN_SLOTS)
      setSlotsCount(numberInRange);
  };

  const incrementColorsCount = (direction: number) => {
    const numberInRange = optionsCount + direction;
    if (numberInRange <= MAXIMUM_COLORS && numberInRange >= MINIMUN_COLORS)
      setOptionsCount(numberInRange);
  };

  const setChosenOption = (index: number, value: string) => {
    const newArr = [...chosenOptions];
    newArr[index] = value;
    setChosenOptions(newArr);
  };

  const toggleResetOnSubmit = () => {
    setResetOnSubmit(!resetOnSubmit);
  };
  const startGameFunction = async () => {
    let rawResult: string | undefined;
    if (vsComputer) {
      const url = `${SERVER_URL}/createNewGame/${slotsCount}/${optionsCount}/${
        allowRepeats ? "1" : "0"
      }/${maxTurns}`;

      console.log(`Fetch to ` + url);
      rawResult = (await axios.get(url)).data;
    } else {
      rawResult = "";
    }
    const result = rawResult;
    setGame({
      remainingTurns: maxTurns,
      turnCount: 0,
      gameId: result,
    });

    setGameState("active");
    setHistory({ rounds: [] });

    if (allowRepeats === true) {
      setAllPossibleOptions(
        getNewPermutations(
          getAllPermutations(usedLetters.slice(0, optionsCount), slotsCount)
        )
      );
    } else {
      setAllPossibleOptions(
        getAllNonRepeatingPermutations(
          usedLetters.slice(0, optionsCount),
          slotsCount
        )
      );
    }
  };

  return (
    <div className="App">
      <GameHeader
        toggleResetOnSubmit={toggleResetOnSubmit}
        resetOnSubmit={resetOnSubmit}
      >
        {gameState === "start" ? (
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
            vsComputer={vsComputer}
            setVsComputer={setVsComputer}
          />
        ) : gameState === "active" ? (
          <Game
            vsComputer={vsComputer}
            usedColors={usedColors}
            allPossibleOptions={allPossibleOptions}
            chosenOptions={chosenOptions}
            history={history}
            game={game as GameType}
            setChosenOptions={setChosenOptions}
            slots={slots}
            submit={submit}
            setChosenOption={setChosenOption}
          />
        ) : endgameResult ? (
          <EndScreen
            setGameState={setGameState}
            endgameResult={endgameResult}
          />
        ) : (
          <></>
        )}
      </GameHeader>
    </div>
  );
}
export default App;
