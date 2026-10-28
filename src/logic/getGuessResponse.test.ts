import { getGuessResponseFromUser } from "./getGuessResponse";

const respond = (black: number, white: number, turnCount = 0, maxTurns = 10) =>
  getGuessResponseFromUser("ABCD", "", turnCount, { black, white }, 4, true, 6, maxTurns);

test("a partial score keeps the game active", () => {
  expect(respond(2, 1)).toEqual({
    gameId: "",
    turns: 1,
    result: { black: 2, white: 1 },
    status: "active",
  });
});

test("all blacks wins and reveals the guess as the secret", () => {
  const response = respond(4, 0, 2);
  expect(response.status).toBe("won");
  expect(response).toMatchObject({ turns: 3, secretWord: ["A", "B", "C", "D"], allowRepeats: "1" });
});

test("the last turn without a win loses, with an unknown secret", () => {
  const response = respond(1, 1, 9, 10);
  expect(response.status).toBe("lost");
  expect(response).toMatchObject({ turns: 10, secretWord: [] });
});
