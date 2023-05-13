import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
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
  const [possibilities, setPossibilities] = useState(
    getAllPermutations(LETTER_OPTIONS.slice(0, slotsCount), slotsCount)
  );
  const [slots, setSlots] = useState<any[]>(
    new Array(slotsCount).fill(
      new Array(slotsCount).fill(LETTER_OPTIONS.slice(0, optionsCount))
    )
  );
  const [allPossibleOptions, setAllPossibleOptions] = useState(
    getAllPermutations(LETTER_OPTIONS.slice(0, optionsCount), slotsCount)
  );
  // const [availableOptions, setAvailableOptions] = useState(
  //   new Array(allPossibleOptions).fill(null)
  // );
  type Game = {
    game_id?: string;
    remainingTurns?: number;
    turnCount?: number;
  };
  const [game, setGame] = useState<Game>({});
  const [history, setHistory] = useState<History>({ rounds: [] });

  const submit = async (arr: string[]) => {
    if (resetOnSubmit) {
      setChosenOptions(new Array(slotsCount).fill(null));
    }
    console.log(arr);
    let str = "";
    arr.forEach((color) => {
      str += LETTER_OPTIONS[COLOR_LIST.indexOf(color)];
    });
    const url = "http://127.0.0.1:5000/game/1/guess/" + str;
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
    console.log(`😯 ${JSON.stringify(result, null, 2)}`);
    setAllPossibleOptions(
      gernerateOptions(
        slotsCount,
        LETTER_OPTIONS.slice(0, optionsCount),
        arr,
        result,
        allPossibleOptions
      )
    );

    const newLi = document.createElement("li");

    newLi.innerHTML = JSON.stringify({
      white: parseInt(result.result.white),
      black: parseInt(result.result.black),
    });
    setGame({ ...result });
    const newEle = <Circle color="green" side={50}></Circle>;
    new Array(result.result.white).fill(null).forEach(() => {
      console.log("adding white");
      // newLi.appendChild(newEle);
    });
    // newLi.innerHTML += new Array(result.result.white).fill(null).map(()=><Circle color="green" side={50}></Circle>) ;
    // newLi.innerHTML += new Array(result.result.black).fill(null).map(()=><Circle color="red" side={50}></Circle>) ;
    // newLi.key = Math.floor(Math.random() * 1000) + "";

    console.log(game);

    const historyList = document.getElementById("resultsList")!;
    if (typeof result.text === "string") historyList.append(newLi);
  };
  useEffect(() => {
    let options = LETTER_OPTIONS.slice(0, optionsCount);
    setSlots(new Array(slotsCount).fill(options));
    // setAllPossibleOptions(Math.pow(optionsCount, slotsCount));
  }, [optionsCount]);
  useEffect(() => {
    let options = LETTER_OPTIONS.slice(0, optionsCount);
    setSlots(new Array(slotsCount).fill(options));
    // setAllPossibleOptions(Math.pow(optionsCount, slotsCount));
  }, [slotsCount]);

  const setChosenOption = (index: number, value: string) => {
    const newArr = [...chosenOptions];
    newArr[index] = value;
    setChosenOptions(newArr);
  };
  const toggleResetOnSubmit = () => {
    setResetOnSubmit(!resetOnSubmit);
  };
  return (
    <div className="App">
      {!gameStarted ? (
        <StartHeader
          slotsCount={slotsCount}
          startGameFunction={setGameStarted}
        />
      ) : (
        <GameHeader />
      )}
      <div>
        <Card>
          <CardBody>
            <p>
              {game["game_id"] ? "Your game is" + game["game_id"] : "Welcome!"}
            </p>
          </CardBody>
        </Card>
        <HistoryPanel history={history}></HistoryPanel>
        <SubmitButton arr={chosenOptions} func={submit}></SubmitButton>
        <OptionsIncrementCard
          optionsCount={optionsCount}
          slotsCount={slotsCount}
          min={min}
          max={max}
          func1={setSlotsCount}
        ></OptionsIncrementCard>
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
        <Flex>
          <ResultsList history={history}></ResultsList>
          {/* {history.rounds.map((slot, index) => (
            <div>{slot.input}
            </div>
          ))} */}
        </Flex>
      </div>
      <h1>{"Answer " + chosenOptions}</h1>

      <Card>
        <p>{"Available options: " + allPossibleOptions.length}</p>
        <button onClick={toggleResetOnSubmit}>
          {"resetOnsubmit?" + resetOnSubmit}
        </button>
      </Card>
    </div>
  );
}

export default App;
