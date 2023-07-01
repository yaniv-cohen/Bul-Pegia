export type GameType = {
  game_id: string;
  remainingTurns?: number;
  turnCount?: number;
};

export type GameState = "start" | "active" | "finished"

export type GuessResult = {
  "secret_word": any,
  "result": { "white": number, "black": number },
  "turns": number,
  "game_id": string,
  "status": "won" | "lost" | "active"
}