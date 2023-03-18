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
import { StartHeader } from "./components/StartHeader";
import { GameHeader } from "./components/GameHeader";

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
    "g",
    "h",
  ];
  const min = 3;
  const max = 8;
  const [count, setCount] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
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
  const submit = (arr: string[]) => {
    console.log(arr);
    let str = "";
    arr.forEach((color) => {
      str += letterOptionsConst[ColorList.indexOf(color)];
    });
    const url = "http://127.0.0.1:5000/game/1/guess/" + str;
    alert(url);
    fetch(url);
    console.log("fetch to" + url);
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
      {!gameStarted ?
        <StartHeader slotsCount={slotsCount} startGameFunction={setGameStarted} />
        : <GameHeader />
        }
      <div>
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
