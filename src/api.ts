import axios from "axios";
import { SERVER_URL } from "./globals";
import { EndGameResponse, GameSettings, GuessResponse } from "./types/game";

export const createGame = async ({
  slotsCount,
  colorsCount,
  allowRepeats,
  maxTurns,
}: GameSettings): Promise<string> => {
  const url = `${SERVER_URL}/createNewGame/${slotsCount}/${colorsCount}/${
    allowRepeats ? "1" : "0"
  }/${maxTurns}`;
  // Keep the id as text: axios would otherwise JSON-parse ids like "1234" or "12e4" into numbers.
  const response = await axios.get<string>(url, {
    responseType: "text",
    transformResponse: (data) => data,
  });
  return response.data;
};

export const submitGuess = async (
  gameId: string,
  guess: string
): Promise<GuessResponse | EndGameResponse> => {
  const response = await axios.get<GuessResponse | EndGameResponse>(
    `${SERVER_URL}/game/${gameId}/guess/${guess}`
  );
  return response.data;
};
