export type GameType = {
  game_id?: string;
  remainingTurns?: number;
  turnCount?: number;
};

export type GameState = "start" | "active" | "finished";

export interface GuessResponse {
  result: { white: number; black: number };
  turns: number;
  game_id: string;
  status: "active";
}

export interface EndGameResponse extends Omit<GuessResponse, "status"> {
  status: "won" | "lost";
  secret_word: string[];
  maxTurns: number;
  numberOfColors: number;
  secretWord: string;
  allowRepeats: boolean;
}
