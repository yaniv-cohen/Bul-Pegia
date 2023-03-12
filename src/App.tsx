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
import HistoryPanel from "./components/historyPanel";

function App() {
  const letterOptionsConst = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
  ];
  const ColorList = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "brown",
    "grey",
  ];
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
  const [optionsCount, setOptionsCount] = useState(6);
  const [slotsCount, setSlotsCount] = useState(4);
  const [chosenOptions, setChosenOptions] = useState(
    new Array(slotsCount).fill(null)
  );
  const [slots, setSlots] = useState(
    new Array(slotsCount).fill(
      new Array(slotsCount).fill(letterOptionsConst.slice(0, optionsCount))
    )
  );
  const [allPossibleOptions, setAllPossibleOptions] = useState(
    Math.pow(optionsCount, slotsCount)
  );
  const [availableOptions, setAvailableOptions] = useState(
    new Array(allPossibleOptions).fill(null)
  );
  type Game = {
    game_id?: string;
    remainingTurns?: number;
    turnCount?: number;
  };
  const [game, setGame] = useState<Game>({});
  const submit = async (arr: string[]) => {
    console.log(arr);
    let str = "";
    arr.forEach((color) => {
      str += letterOptionsConst[ColorList.indexOf(color)];
    });
    const url = "http://127.0.0.1:5000/game/1/guess/" + str;
    console.log(`fetch to ` + url);
    const result = await (await fetch(url)).json();
    console.log(`😯 ${JSON.stringify(result, null, 2)}`);
    const newLi = document.createElement("li");
    newLi.innerHTML = JSON.stringify({
      white: result.result.white,
      black: result.result.black,
    });
    // newLi.key = Math.floor(Math.random() * 1000) + "";
    setGame({ ...result });
    const historyList = document.getElementById("resultsList")!;
    if (typeof result.text === "string") historyList.append(newLi);
  };
  useEffect(() => {
    let options = letterOptionsConst.slice(0, optionsCount);
    setSlots(new Array(slotsCount).fill(options));
    setAllPossibleOptions(Math.pow(optionsCount, slotsCount));
  }, [optionsCount]);
  useEffect(() => {
    let options = letterOptionsConst.slice(0, optionsCount);
    setSlots(new Array(slotsCount).fill(options));
    setAllPossibleOptions(Math.pow(optionsCount, slotsCount));
  }, [slotsCount]);

  const setChosenOption = (index: number, value: string) => {
    const newArr = [...chosenOptions];
    newArr[index] = value;
    setChosenOptions(newArr);
  };
  return (
    <div className="App">
      <div>
        <Card>
          <CardBody>
            {game["game_id"] ? "Your game is" + game["game_id"] : "Welcome!"}
          </CardBody>
        </Card>
        <HistoryPanel></HistoryPanel>
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
              ColorList={ColorList}
            ></SlotAccordion>
          ))}
        </Flex>
      </div>
      <SubmitButton arr={chosenOptions} func={submit}></SubmitButton>
      <h1>{"Answer " + chosenOptions}</h1>

      <Card>
        <p>{"Available options: " + allPossibleOptions}</p>
      </Card>
    </div>
  );
}

export default App;
