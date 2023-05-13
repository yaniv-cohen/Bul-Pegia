import { Result } from "../types/historyTypes"

export const getResult = (A: string[], B: string[]): Result => {
    let blacks = 0
    let whites = 0
    for (let i = 0; i < A.length; i++) {
        const a = A[i];
        const b = B[i];
        if (a === b) {
            A[i]= ''
            blacks++
        }
        else {
            let countInB = 0
            B.forEach(char => { if (a === char &&) countInB++ })
            whites += countInB

        }
    }
    return { black: blacks, white: Math.max(0, whites - blacks) }
}