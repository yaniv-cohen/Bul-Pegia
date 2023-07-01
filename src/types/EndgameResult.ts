import { History } from "./historyTypes";

export type EndgameResult = {
    gameId: string;
    turns: number;
    maxTurns: number;
    history: History,
    status: "win" | "loss";
}