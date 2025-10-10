export const getFirstEmptyIndex = (arr: any[], startingIndex = 0): number | undefined => {
    let move = 1
    
    while (startingIndex + move < arr.length) {
        const currentCell = arr[startingIndex + move]
        if (!currentCell) {
            return startingIndex + move
        }
        else move++;
    }
    move = 0;
    while (move < startingIndex) {
        const currentCell = arr[ move]
        if (!currentCell) {
            return move
        }
        move++;
    }
}
