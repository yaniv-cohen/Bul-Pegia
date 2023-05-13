import { Result } from "../types/historyTypes";
import { LETTER_OPTIONS } from "../utils/letters"
import { getResult } from "./getResult";

const gernerateOptions = (slots: number,
    options: string[],
    inputWord: string[],
    result: Result,
    allPossibleCombinations: Array<string[]> = subset(options, slots),
):
    any[] => {
    console.log('starting with ' + allPossibleCombinations);

    const newPossibleCombinations = allPossibleCombinations.filter((possibility) => {
        return result === getResult(possibility, inputWord)
    }
    )



    console.log('returning', newPossibleCombinations);

    return newPossibleCombinations
}

gernerateOptions(4, LETTER_OPTIONS, ['a', 'b', 'c', 'd'], { black: 3, white: 1 })

function subset(arra: string[], arra_size: number) {
    var result_set = [],
        result;


    for (var x = 0; x < Math.pow(2, arra.length); x++) {
        result = [];
        let i = arra.length - 1;
        do {
            if ((x & (1 << i)) !== 0) {
                result.push(arra[i]);
            }
        } while (i--);

        if (result.length >= arra_size) {
            result_set.push(result);
        }
    }

    return result_set;
}
