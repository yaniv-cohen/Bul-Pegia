export type GameType = {
  gameId?: string;
  remainingTurns?: number;
  turnCount?: number;
};

export type GameState = "start" | "active" | "finished";

export interface GuessResponse {
  result: { white: number; black: number };
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
