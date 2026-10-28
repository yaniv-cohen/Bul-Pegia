import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { createGame, submitGuess } from "../api";
import { useGame } from "./useGame";

vi.mock("../api", () => ({
  createGame: vi.fn(),
  submitGuess: vi.fn(),
}));

const mockedCreateGame = vi.mocked(createGame);
const mockedSubmitGuess = vi.mocked(submitGuess);

beforeEach(() => {
  vi.resetAllMocks();
  mockedCreateGame.mockResolvedValue("ab12");
});

const startGame = async () => {
  const hook = renderHook(() => useGame());
  await act(() => hook.result.current.startGame());
  return hook;
};

const choose = (hook: Awaited<ReturnType<typeof startGame>>, colors: string[]) =>
  act(() => hook.result.current.setChosenOptions(colors));

describe("settings", () => {
  test("counters stay within their limits", () => {
    const { result } = renderHook(() => useGame());
    act(() => {
      for (let i = 0; i < 10; i++) result.current.incrementSlotsCount(1);
    });
    expect(result.current.settings.slotsCount).toBe(8);
    act(() => {
      for (let i = 0; i < 10; i++) result.current.incrementColorsCount(-1);
    });
    expect(result.current.settings.colorsCount).toBe(2);
    expect(result.current.usedColors).toEqual(["red", "orange"]);
  });

  test("no repeats with fewer colors than slots is invalid", () => {
    const { result } = renderHook(() => useGame());
    expect(result.current.settingsValid).toBe(true);
    act(() => result.current.toggleAllowRepeats());
    act(() => result.current.incrementColorsCount(-3));
    expect(result.current.settingsValid).toBe(false);
  });
});

describe("vs computer", () => {
  test("starting a game creates it on the server and resets the board", async () => {
    const hook = await startGame();
    expect(mockedCreateGame).toHaveBeenCalledWith(expect.objectContaining({ slotsCount: 4 }));
    expect(hook.result.current.gameState).toBe("active");
    expect(hook.result.current.game).toEqual({ gameId: "ab12", turnCount: 0 });
    expect(hook.result.current.chosenOptions).toEqual([null, null, null, null]);
    expect(hook.result.current.possibleOptions).toHaveLength(6 ** 4 + 1);
  });

  test("an incomplete guess is not sent", async () => {
    const hook = await startGame();
    let outcome;
    await act(async () => {
      outcome = await hook.result.current.submit();
    });
    expect(outcome).toBe("incomplete");
    expect(mockedSubmitGuess).not.toHaveBeenCalled();
  });

  test("a guess is recorded and narrows the possible options", async () => {
    const hook = await startGame();
    mockedSubmitGuess.mockResolvedValue({
      result: { black: 0, white: 0 },
      turns: 1,
      gameId: "ab12",
      status: "active",
    });
    choose(hook, ["red", "red", "orange", "orange"]);
    await act(() => hook.result.current.submit());

    expect(mockedSubmitGuess).toHaveBeenCalledWith("ab12", "AABB");
    expect(hook.result.current.rounds).toEqual([
      { input: "AABB", output: { black: 0, white: 0 } },
    ]);
    expect(hook.result.current.game.turnCount).toBe(1);
    // Only C-F remain: 4^4 combinations.
    expect(hook.result.current.possibleOptions).toHaveLength(4 ** 4);
  });

  test("the same guess twice is rejected", async () => {
    const hook = await startGame();
    mockedSubmitGuess.mockResolvedValue({
      result: { black: 1, white: 0 },
      turns: 1,
      gameId: "ab12",
      status: "active",
    });
    choose(hook, ["red", "red", "red", "red"]);
    await act(() => hook.result.current.submit());
    choose(hook, ["red", "red", "red", "red"]);
    let outcome;
    await act(async () => {
      outcome = await hook.result.current.submit();
    });
    expect(outcome).toBe("duplicate");
    expect(mockedSubmitGuess).toHaveBeenCalledTimes(1);
  });

  test("a server error is reported, not thrown", async () => {
    const hook = await startGame();
    mockedSubmitGuess.mockRejectedValue(new Error("network"));
    choose(hook, ["red", "red", "red", "red"]);
    let outcome;
    await act(async () => {
      outcome = await hook.result.current.submit();
    });
    expect(outcome).toBe("error");
    expect(hook.result.current.rounds).toEqual([]);
  });

  test("winning finishes the game with every round", async () => {
    const hook = await startGame();
    mockedSubmitGuess.mockResolvedValue({
      result: { black: 4, white: 0 },
      turns: 1,
      gameId: "ab12",
      status: "won",
      secretWord: ["A", "B", "C", "D"],
      maxTurns: 10,
      numberOfColors: 6,
      allowRepeats: "1",
    });
    choose(hook, ["red", "orange", "yellow", "green"]);
    await act(() => hook.result.current.submit());

    expect(hook.result.current.gameState).toBe("finished");
    expect(hook.result.current.endgameResult).toEqual({
      gameId: "ab12",
      rounds: [{ input: "ABCD", output: { black: 4, white: 0 } }],
      secretWord: ["A", "B", "C", "D"],
      allowRepeats: true,
      numberOfColors: 6,
      maxTurns: 10,
      turns: 1,
      status: "won",
    });
  });
});

describe("vs human", () => {
  test("the score comes from the player and four blacks wins", async () => {
    const hook = renderHook(() => useGame());
    act(() => hook.result.current.setVsComputer(false));
    await act(() => hook.result.current.startGame());
    expect(mockedCreateGame).not.toHaveBeenCalled();

    choose(hook, ["red", "orange", "yellow", "green"]);
    await act(() => hook.result.current.submit({ black: 4, white: 0 }));
    expect(mockedSubmitGuess).not.toHaveBeenCalled();
    expect(hook.result.current.gameState).toBe("finished");
    expect(hook.result.current.endgameResult?.secretWord).toEqual(["A", "B", "C", "D"]);
  });
});
