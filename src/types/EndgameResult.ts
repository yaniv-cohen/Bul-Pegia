import { GuessResponse } from "./Game";
import { History } from "./historyTypes";

export type EndgameResult = {
  gameId: string;

  //   game_id
  // secret_word
  // allow_repeats
  // numbeOfColors
  // result: { white: number; black: number };
  turns: number;
  secretWord: string[];
  allowRepeats: boolean;
  numberOfColors: number;
  maxTurns: number;
  history: History;
  status: "won" | "lost";
};
