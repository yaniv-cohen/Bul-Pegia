export interface Result {
  black: number;
  white: number;
}

/** A guess as letters (not colors) and the score it got. */
export type Round = {
  input: string;
  output: Result;
};

export type GameState = "start" | "active" | "finished";

export type GameSettings = {
  slotsCount: number;
  colorsCount: number;
  maxTurns: number;
  allowRepeats: boolean;
  vsComputer: boolean;
};

export type ActiveGame = {
  gameId: string;
  turnCount: number;
};

export interface GuessResponse {
  result: Result;
  turns: number;
  gameId: string;
  status: "active";
}

export interface EndGameResponse extends Omit<GuessResponse, "status"> {
  status: "won" | "lost";
  secretWord: string[];
  maxTurns: number;
  numberOfColors: number;
  allowRepeats: "1" | "0";
}

export type EndgameResult = {
  gameId: string;
  turns: number;
  secretWord: string[];
  allowRepeats: boolean;
  numberOfColors: number;
  maxTurns: number;
  rounds: Round[];
  status: "won" | "lost";
};
