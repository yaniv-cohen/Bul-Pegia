export type Round = {
  input: string;
  output: { black: number; white: number };
};
export type History = {
  rounds: Round[];
};
