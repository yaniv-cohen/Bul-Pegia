import { History } from "./historyTypes";

export type EndgameResult = {
  gameId: string;
  turns: number;
  secretWord: string[];
  allowRepeats: boolean;
  numberOfColors: number;
  maxTurns: number;
  history: History;
  status: "won" | "lost";
};
