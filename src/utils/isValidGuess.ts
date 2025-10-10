export const noEmptyCellsInArr = (guess: string[]) => {
  return guess.every(cell=>{return cell && cell!=="undefined"});
};
