import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.scss";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import OptionsIncrementCard from "./components/OptionsIncrementCard";
import SlotAccordion from "./components/SlotAccordion";
import SubmitButton from "./components/SubmitButton";
import { History } from "./types/historyTypes";
import { COLOR_LIST, LETTER_OPTIONS } from "./utils/letters";
import Circle from "./components/utils/Circle";
import HistoryPanel from "./components/historyPanel/HistoryPanel";
import { StartHeader } from "./components/StartHeader";
import { GameHeader } from "./components/GameHeader";
import { ResultsList } from "./components/ResultsList";
import { getAllPermutations } from "./utils/getAllPermutations";
import { gernerateOptions } from "./logic/generateOptions";
import CheatPanel from "./components/CheatPanel/CheatPanel";
import { ToggleButton } from "./components/utils/ToggleButton";
import axios from "axios";
import { chooseBest } from "./logic/chooseBest";

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
  const min = 3;
  const max = 8;
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

  type Game = {
    game_id: string;
    remainingTurns?: number;
    turnCount?: number;
  };
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
      console.log(round.input, +" 👌 " + str);

      if (round.input === str) {
        setChosenOptions(new Array(slotsCount).fill(""));
        return;
      }
    }

    const url = `http://127.0.0.1:5000/game/${game?.game_id}/guess/` + str;
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
    // console.log(`😯 ${JSON.stringify(result, null, 2)}`);
    if (result.result.black === slotsCount) {
      alert("you won!");
      setGameStarted(false);
    }
    console.log("prelength is  ", allPossibleOptions.length);

    const newOptions = chooseBest(
      gernerateOptions(
        slotsCount,
        LETTER_OPTIONS.slice(0, optionsCount),
        str.split(""),
        result.result,
        allPossibleOptions
      )
    );
    console.log(
      "🚀 ~ file: App.tsx:114 ~ submit ~ newOptions:",
      newOptions[0],
      newOptions[1]
    );
    setAllPossibleOptions(newOptions);

    if (resetOnSubmit) {
      setChosenOptions(new Array(slotsCount).fill(null));
    }

    // newLi.innerHTML += new Array(result.result.white).fill(null).map(()=><Circle color="green" side={50}></Circle>) ;
    // newLi.innerHTML += new Array(result.result.black).fill(null).map(()=><Circle color="red" side={50}></Circle>) ;
    // newLi.key = Math.floor(Math.random() * 1000) + "";

    // const historyList = document.getElementById("resultsList")!;
    // if (typeof result.text === "string") historyList.append(newLi);
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
    const url = `http://127.0.0.1:5000/createNewGame/${slotsCount}/${optionsCount}`;
    console.log(`fetch to ` + url);
    const result = (await axios.get(url)).data;
    console.log(result);

    setGame({ game_id: result, remainingTurns: 1, turnCount: 1 });
    setGameStarted(true);
    setAllPossibleOptions(
      getAllPermutations(LETTER_OPTIONS.slice(0, optionsCount), slotsCount)
    );
    setHistory({ rounds: [] });
    console.log(`😊`, JSON.stringify(game));
  };
  return (
    <div className="App">
      {!gameStarted ? (
        <>
          <StartHeader
            slotsCount={slotsCount}
            startGameFunction={startGameFunction}
          >
            <OptionsIncrementCard
              optionsCount={optionsCount}
              slotsCount={slotsCount}
              min={min}
              max={max}
              func1={setSlotsCount}
            ></OptionsIncrementCard>
          </StartHeader>
          <img
            width="300px"
            src="https://play-lh.googleusercontent.com/AKwkpj-Eq6SgEXu9SlSYO-cMMIIGh62Zqp012IaWmuFOlyM-B_y7BvDfJ9FEtvSWy6s"
          />
        </>
      ) : (
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
