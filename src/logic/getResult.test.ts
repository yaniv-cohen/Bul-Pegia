import { getResult } from "./getResult"

test('blacks only', () => {
    expect(getResult(['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'd'])).toEqual({ black: 4, white: 0 })
    expect(getResult(['a', 'b', 'c', 'd'], ['a', 'b', 'c', 'e'])).toEqual({ black: 3, white: 0 })
    expect(getResult(['a', 'b', 'c', 'd'], ['a', 'b', 'e', 'e'])).toEqual({ black: 2, white: 0 })
    expect(getResult(['a', 'b', 'c', 'd'], ['a', 'e', 'e', 'e'])).toEqual({ black: 1, white: 0 })
    expect(getResult(['a', 'b', 'c', 'd'], ['e', 'e', 'e', 'e'])).toEqual({ black: 0, white: 0 })
})

test('whites only', () => {
    expect(getResult(['a', 'b', 'c', 'd'], ['d', 'a', 'b', 'c'])).toEqual({ black: 0, white: 4 })
    expect(getResult(['a', 'b', 'c', 'd'], ['e', 'a', 'b', 'c'])).toEqual({ black: 0, white: 3 })
    expect(getResult(['a', 'b', 'c', 'd'], ['e', 'e', 'b', 'c'])).toEqual({ black: 0, white: 2 })
    expect(getResult(['a', 'b', 'c', 'd'], ['e', 'e', 'e', 'c'])).toEqual({ black: 0, white: 1 })
    expect(getResult(['a', 'b', 'c', 'd'], ['e', 'e', 'e', 'e'])).toEqual({ black: 0, white: 0 })
})
test('both ', () => {
    expect(getResult(['a', 'b', 'c', 'd'], ['a', 'a', 'a', 'a'])).toEqual({ black: 1, white: 0})
    expect(getResult(['a', 'a', 'c', 'd'], ['e', 'a', 'a', 'a'])).toEqual({ black: 1, white: 1 })
    expect(getResult(['a', 'b', 'c', 'd'], ['e', 'e', 'b', 'c'])).toEqual({ black: 0, white: 2 })
    expect(getResult(['a', 'b', 'c', 'd'], ['e', 'e', 'e', 'c'])).toEqual({ black: 0, white: 1 })
    expect(getResult(['a', 'b', 'c', 'd'], ['e', 'e', 'e', 'e'])).toEqual({ black: 0, white: 0 })
})
