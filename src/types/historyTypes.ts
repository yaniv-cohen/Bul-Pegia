/**Char values, not colors
*/
export type Round = {
  input: string;
  output: Result;
};

export type History = {
  rounds: Round[];
};



export interface Result {
  black: number
  white: number
}