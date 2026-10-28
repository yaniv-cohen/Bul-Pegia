import { useMemo, useState } from "react";
import { createGame, submitGuess } from "../api";
import {
  MAXIMUM_COLORS,
  MAXIMUM_SLOTS,
  MAXIMUM_TURNS,
  MINIMUM_COLORS,
  MINIMUM_SLOTS,
  MINIMUM_TURNS,
} from "../globals";
import { chooseBest } from "../logic/chooseBest";
import { filterOptions } from "../logic/filterOptions";
import { getGuessResponseFromUser } from "../logic/getGuessResponse";
import { getValidGuess } from "../logic/getValidGuess";
import {
  ActiveGame,
  EndgameResult,
  GameSettings,
  GameState,
  Result,
  Round,
} from "../types/game";
import { LETTER_OPTIONS } from "../utils/colors";
import { getAllNonRepeatingPermutations } from "../utils/getAllNonRepeatingPermutations";
import { getAllPermutations } from "../utils/getAllPermutations";
import { prioritizeTwoColorGuess } from "../utils/prioritizeTwoColorGuess";

export type SubmitOutcome = "ok" | "incomplete" | "duplicate" | "error";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const emptyGuess = (slotsCount: number): Array<string | null> =>
  new Array(slotsCount).fill(null);

export const useGame = () => {
  const [settings, setSettings] = useState<GameSettings>({
    slotsCount: 4,
    colorsCount: 6,
    maxTurns: 10,
    allowRepeats: true,
    vsComputer: true,
  });
  const { slotsCount, colorsCount, maxTurns, allowRepeats, vsComputer } = settings;
  const usedLetters = useMemo(() => LETTER_OPTIONS.slice(0, colorsCount), [colorsCount]);
  const settingsValid = allowRepeats || colorsCount >= slotsCount;

  const [gameState, setGameState] = useState<GameState>("start");
  const [game, setGame] = useState<ActiveGame>({ gameId: "", turnCount: 0 });
  const [rounds, setRounds] = useState<Round[]>([]);
  const [endgameResult, setEndgameResult] = useState<EndgameResult>();
  const [chosenOptions, setChosenOptions] = useState<Array<string | null>>(
    emptyGuess(slotsCount)
  );
  const [possibleOptions, setPossibleOptions] = useState<string[][]>([]);
  const [resetOnSubmit, setResetOnSubmit] = useState(false);

  const updateSettings = (update: (current: GameSettings) => Partial<GameSettings>) =>
    setSettings((current) => ({ ...current, ...update(current) }));

  const incrementSlotsCount = (direction: number) =>
    updateSettings((s) => ({ slotsCount: clamp(s.slotsCount + direction, MINIMUM_SLOTS, MAXIMUM_SLOTS) }));
  const incrementColorsCount = (direction: number) =>
    updateSettings((s) => ({ colorsCount: clamp(s.colorsCount + direction, MINIMUM_COLORS, MAXIMUM_COLORS) }));
  const incrementMaxTurns = (direction: number) =>
    updateSettings((s) => ({ maxTurns: clamp(s.maxTurns + direction, MINIMUM_TURNS, MAXIMUM_TURNS) }));
  const toggleAllowRepeats = () => updateSettings((s) => ({ allowRepeats: !s.allowRepeats }));
  const setVsComputer = (value: boolean) => updateSettings(() => ({ vsComputer: value }));

  /** The guess is kept as letters; colors are only how the palette paints them. */
  const setChosenOption = (index: number, letter: string | null) =>
    setChosenOptions((current) => current.map((value, i) => (i === index ? letter : value)));

  /** Throws if the server could not create a game. */
  const startGame = async () => {
    const gameId = vsComputer ? await createGame(settings) : "";
    setGame({ gameId, turnCount: 0 });
    setRounds([]);
    setEndgameResult(undefined);
    setChosenOptions(emptyGuess(slotsCount));
    setPossibleOptions(
      allowRepeats
        ? prioritizeTwoColorGuess(getAllPermutations(usedLetters, slotsCount))
        : getAllNonRepeatingPermutations(usedLetters, slotsCount)
    );
    setGameState("active");
  };

  const backToStart = () => setGameState("start");

  const submit = async (manualInput?: Result): Promise<SubmitOutcome> => {
    const guess = getValidGuess(chosenOptions);
    if (!guess) {
      return "incomplete";
    }
    if (rounds.some((round) => round.input === guess)) {
      setChosenOptions(emptyGuess(slotsCount));
      return "duplicate";
    }

    let response;
    if (vsComputer) {
      try {
        response = await submitGuess(game.gameId, guess);
      } catch {
        return "error";
      }
    } else {
      response = getGuessResponseFromUser(
        guess,
        game.gameId,
        game.turnCount,
        manualInput ?? { black: 0, white: 0 },
        slotsCount,
        allowRepeats,
        colorsCount,
        maxTurns
      );
    }

    const newRounds = [...rounds, { input: guess, output: response.result }];
    setRounds(newRounds);
    setGame({ ...game, turnCount: response.turns });

    if (response.status !== "active") {
      setEndgameResult({
        gameId: response.gameId,
        rounds: newRounds,
        secretWord: response.secretWord,
        allowRepeats: response.allowRepeats === "1",
        numberOfColors: response.numberOfColors,
        maxTurns: response.maxTurns,
        turns: response.turns,
        status: response.status,
      });
      setGameState("finished");
    }

    const newOptions = filterOptions(
      slotsCount,
      usedLetters,
      guess.split(""),
      response.result,
      possibleOptions
    );
    if (newOptions.length > 0) {
      const [bestIndex, bestOption] = chooseBest(newOptions);
      setPossibleOptions([
        bestOption,
        ...newOptions.slice(0, bestIndex),
        ...newOptions.slice(bestIndex + 1),
      ]);
    } else {
      setPossibleOptions([]);
    }

    if (resetOnSubmit) {
      setChosenOptions(emptyGuess(slotsCount));
    }
    return "ok";
  };

  return {
    settings,
    settingsValid,
    usedLetters,
    gameState,
    game,
    rounds,
    endgameResult,
    chosenOptions,
    possibleOptions,
    resetOnSubmit,
    incrementSlotsCount,
    incrementColorsCount,
    incrementMaxTurns,
    toggleAllowRepeats,
    setVsComputer,
    setChosenOption,
    setChosenOptions,
    toggleResetOnSubmit: () => setResetOnSubmit((value) => !value),
    startGame,
    backToStart,
    submit,
  };
};

export type GameController = ReturnType<typeof useGame>;
