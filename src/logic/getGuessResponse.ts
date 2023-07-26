import { EndGameResponse, GameType, GuessResponse } from "../types/Game";
import { Result } from "../types/historyTypes";

export const getGuessResponseFromUser = (
  guessAsChars: string,
  game: GameType | undefined,
  manualInput: Result,
  slotsCount: number,
  allowRepeats: boolean,
  optionsCount: number,
  maxTurns: number
): EndGameResponse | GuessResponse => {
  let rawResult: GuessResponse | EndGameResponse;

  if (manualInput.black < slotsCount) {
    rawResult = {
      turns: (game?.turnCount ?? 0) + 1,
      result: manualInput,
      status: "active",
    } as GuessResponse;
  } else {
    rawResult = {
      gameId: game?.gameId,
      turns: (game?.turnCount ?? 0) + 1,
      maxTurns: maxTurns,
      allowRepeats: allowRepeats ? "1" : "0",
      numberOfColors: optionsCount,
      result: manualInput,
      secretWord: guessAsChars.split(""),
      status: "won",
    } as EndGameResponse;
  }

  return rawResult;
};

export async function getGuessResponseFromServer(
  guessAsChars: string,
  game: GameType | undefined,
  SERVER_URL: string
): Promise<EndGameResponse | GuessResponse> {
  const url = `${SERVER_URL}/game/${game?.gameId}/guess/` + guessAsChars;
  console.log(`fetch to ` + url);
  return (await (await fetch(url)).json()) as unknown as
    | GuessResponse
    | EndGameResponse;
}
