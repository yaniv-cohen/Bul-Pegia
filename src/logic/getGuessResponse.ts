import { EndGameResponse, GuessResponse, Result } from "../types/game";

/** Build a server-like response from a score entered by a human opponent. */
export const getGuessResponseFromUser = (
  guess: string,
  gameId: string,
  turnCount: number,
  manualInput: Result,
  slotsCount: number,
  allowRepeats: boolean,
  colorsCount: number,
  maxTurns: number
): EndGameResponse | GuessResponse => {
  const turns = turnCount + 1;
  const won = manualInput.black === slotsCount;
  if (!won && turns < maxTurns) {
    return { gameId, turns, result: manualInput, status: "active" };
  }
  return {
    gameId,
    turns,
    maxTurns,
    allowRepeats: allowRepeats ? "1" : "0",
    numberOfColors: colorsCount,
    result: manualInput,
    // The opponent's secret is only known when it was guessed.
    secretWord: won ? guess.split("") : [],
    status: won ? "won" : "lost",
  };
};
