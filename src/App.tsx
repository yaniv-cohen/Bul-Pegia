import { useEffect, useState } from "react";
import "./App.scss";
import {
  Card,
  CardBody,
  Flex,
} from "@chakra-ui/react";
import OptionsIncrementCard from "./components/OptionsIncrementCard";
import SlotAccordion from "./components/SlotAccordion";
import SubmitButton from "./components/SubmitButton";
import { History } from "./types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "./utils/letters";
import HistoryPanel from "./components/historyPanel/HistoryPanel";
import { GameHeader } from "./components/GameHeader";
import { getAllPermutations } from "./utils/getAllPermutations";
import { gernerateOptions } from "./logic/generateOptions";
import CheatPanel from "./components/CheatPanel/CheatPanel";
import { ToggleButton } from "./components/utils/ToggleButton";
import axios from "axios";
import { chooseBest } from "./logic/chooseBest";
import { Game } from "./types/shared";
import { MAX_SLOTS_COUNT, MIN_SLOTS_COUNT, SERVER_URL } from "./gameSettings";
import { StartScreen } from "./components/StartScreen";

function App() {
  // const colorMap:{
  //   "red": "a",
  //   "orange":"b",
  //   "yellow":"c",
  //   "green":"d",
  //   "blue":"e",
  //   "purple":"f",
  //   "brown":"g",
  //   "grey":"h",
  // }

  const [count, setCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [optionsCount, setOptionsCount] = useState(6);
  const [slotsCount, setSlotsCount] = useState(4);
  const [chosenOptions, setChosenOptions] = useState(
    new Array(slotsCount).fill(null)
  );
  const [resetOnSubmit, setResetOnSubmit] = useState(false);
  const [slots, setSlots] = useState<any[]>(
    new Array(slotsCount).fill(
      new Array(slotsCount).fill(LETTER_OPTIONS.slice(0, optionsCount))
    )
  );
  const [allPossibleOptions, setAllPossibleOptions] = useState(
    getAllPermutations(LETTER_OPTIONS.slice(0, optionsCount), slotsCount)
  );
  const [useCheatPanel, setUseCheatPanel] = useState(false);


  const [game, setGame] = useState<Game>();
  const [history, setHistory] = useState<History>({ rounds: [] });
  const toggleUseCheatPanel = () => {
    setUseCheatPanel(!useCheatPanel);
  };
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
  const startGameFunction = async (slotsCount: number, optionsCount: number) => {
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
      {!gameStarted ?
        <StartScreen slotsCount={optionsCount} optionsCount={optionsCount}
          startGameFunction={startGameFunction} setSlotsCount={setSlotsCount} >
        </StartScreen>
        : (
          <>
            <GameHeader></GameHeader>
            <div>
              <Card>
                <CardBody>
                  <p>
                    {game && game["game_id"]
                      ? "Your game is" + game["game_id"]
                      : "Welcome!"}
                  </p>
                </CardBody>
              </Card>
              <HistoryPanel history={history}></HistoryPanel>
              <SubmitButton arr={chosenOptions} func={submit}></SubmitButton>

              <Flex>
                {slots.map((slot, index) => (
                  <SlotAccordion
                    chosen={chosenOptions[index]}
                    index={index + 1}
                    slot={slot}
                    setChosenOption={setChosenOption}
                    ColorList={COLOR_LIST}
                  ></SlotAccordion>
                ))}
              </Flex>
            </div>
            <Card>
              <button onClick={toggleResetOnSubmit}>
                {"resetOnsubmit?" + resetOnSubmit}
              </button>
            </Card>
            <aside className="CheatPanel">
              <ToggleButton
                text={useCheatPanel ? "X" : "CheatPanel >"}
                fn={toggleUseCheatPanel}
              ></ToggleButton>
              {useCheatPanel ? (
                <CheatPanel
                  setSelection={setChosenOptions}
                  options={allPossibleOptions}
                />
              ) : (
                <></>
              )}
            </aside>
          </>
        )}
    </div>
  );
}
export default App;
