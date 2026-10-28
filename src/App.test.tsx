import { ChakraProvider } from "@chakra-ui/react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import App from "./App";
import { createGame, submitGuess } from "./api";
import { theme } from "./theme";
import { PaletteProvider } from "./hooks/usePalette";
import { EndGameResponse, GuessResponse } from "./types/game";

vi.mock("./api", () => ({
  createGame: vi.fn(),
  submitGuess: vi.fn(),
}));

const mockedCreateGame = vi.mocked(createGame);
const mockedSubmitGuess = vi.mocked(submitGuess);

const active = (black: number, white: number, turns = 1): GuessResponse => ({
  result: { black, white },
  turns,
  gameId: "ab12",
  status: "active",
});

const won = (turns = 1): EndGameResponse => ({
  result: { black: 4, white: 0 },
  turns,
  gameId: "ab12",
  status: "won",
  secretWord: ["A", "B", "C", "D"],
  maxTurns: 10,
  numberOfColors: 6,
  allowRepeats: "1",
});

const renderApp = () => {
  const user = userEvent.setup();
  render(
    <ChakraProvider theme={theme}>
      <PaletteProvider>
        <App />
      </PaletteProvider>
    </ChakraProvider>
  );
  return user;
};

const startGame = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: "התחל!" }));
  await screen.findByText(/סיבוב/);
};

const slot = (index: number) => screen.getByRole("button", { name: new RegExp(`^מקום ${index}:`) });

const pickColors = async (user: ReturnType<typeof userEvent.setup>, colors: string[]) => {
  const palette = screen.getByRole("region", { name: "בחירת צבעים" });
  for (const color of colors) {
    await user.click(within(palette).getByRole("button", { name: color }));
  }
};

beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  mockedCreateGame.mockResolvedValue("ab12");
});

describe("start screen", () => {
  test("steppers stay within their limits", async () => {
    const user = renderApp();
    const slots = screen.getByRole("group", { name: "מקומות" });
    for (let i = 0; i < 6; i++) {
      await user.click(within(slots).getByRole("button", { name: "הוסף מקומות" }));
    }
    expect(within(slots).getByText("8")).toBeInTheDocument();

    const turns = screen.getByRole("group", { name: "ניסיונות" });
    for (let i = 0; i < 12; i++) {
      await user.click(within(turns).getByRole("button", { name: "הפחת ניסיונות" }));
    }
    expect(within(turns).getByText("1")).toBeInTheDocument();
  });

  test("no repeats with fewer colors than slots blocks the start", async () => {
    const user = renderApp();
    await user.click(screen.getByRole("checkbox", { name: "חזרה על צבעים" }));
    const colors = screen.getByRole("group", { name: "צבעים" });
    for (let i = 0; i < 3; i++) {
      await user.click(within(colors).getByRole("button", { name: "הפחת צבעים" }));
    }
    expect(screen.getByRole("alert")).toHaveTextContent("מספר הצבעים");
    expect(screen.getByRole("button", { name: "התחל!" })).toBeDisabled();
  });

  test("a server failure shows a toast and stays on the start screen", async () => {
    mockedCreateGame.mockRejectedValue(new Error("down"));
    const user = renderApp();
    await user.click(screen.getByRole("button", { name: "התחל!" }));
    expect(await screen.findByText("השרת לא זמין, נסה שוב בעוד רגע")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "התחל!" })).toBeInTheDocument();
  });
});

describe("vs computer", () => {
  test("guess, see the score in the history, then win", async () => {
    const user = renderApp();
    await startGame(user);

    mockedSubmitGuess.mockResolvedValueOnce(active(1, 2));
    await pickColors(user, ["אדום", "כתום", "צהוב", "ירוק"]);
    expect(slot(4)).toHaveAccessibleName("מקום 4: ירוק");
    await user.click(screen.getByRole("button", { name: "נחש!" }));

    expect(mockedSubmitGuess).toHaveBeenCalledWith("ab12", "ABCD");
    const history = await screen.findByRole("region", { name: "ניחושים קודמים" });
    const clue = within(history).getByRole("img", { name: "1 שחורים, 2 לבנים" });
    // Only the earned pegs are drawn - no empty placeholders.
    expect(clue.querySelectorAll(".KeyPeg--black")).toHaveLength(1);
    expect(clue.querySelectorAll(".KeyPeg--white")).toHaveLength(2);
    expect(clue.querySelectorAll(".KeyPeg--empty")).toHaveLength(0);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("סיבוב 2 / 10");

    mockedSubmitGuess.mockResolvedValueOnce(won(2));
    await pickColors(user, ["סגול"]); // change slot 1 so it isn't a duplicate
    await user.click(screen.getByRole("button", { name: "נחש!" }));
    expect(mockedSubmitGuess).toHaveBeenLastCalledWith("ab12", "FBCD");

    expect(await screen.findByRole("heading", { name: "ניצחון!" })).toBeInTheDocument();
    expect(screen.getByText("2/10")).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: /אדום|כתום|צהוב|ירוק/ })).toHaveLength(4); // secret pegs

    await user.click(screen.getByRole("button", { name: "שחק שוב" }));
    expect(screen.getByRole("button", { name: "התחל!" })).toBeInTheDocument();
  });

  test("the Guess button lights up once every slot is filled, and not for a repeat", async () => {
    const user = renderApp();
    await startGame(user);
    const guessButton = screen.getByRole("button", { name: "נחש!" });
    expect(guessButton).toHaveAttribute("data-ready", "false");

    await pickColors(user, ["אדום", "כתום", "צהוב"]);
    expect(guessButton).toHaveAttribute("data-ready", "false");
    await pickColors(user, ["ירוק"]);
    expect(guessButton).toHaveAttribute("data-ready", "true");

    mockedSubmitGuess.mockResolvedValue(active(0, 0));
    await user.click(guessButton);
    await screen.findByRole("region", { name: "ניחושים קודמים" });
    // Same four colors are still selected, but that guess was already made.
    expect(screen.getByRole("button", { name: "נחש!" })).toHaveAttribute("data-ready", "false");
  });

  test("a guess with no hits shows no clue pegs at all", async () => {
    const user = renderApp();
    await startGame(user);
    mockedSubmitGuess.mockResolvedValue(active(0, 0));
    await pickColors(user, ["אדום", "אדום", "אדום", "אדום"]);
    await user.click(screen.getByRole("button", { name: "נחש!" }));
    const history = await screen.findByRole("region", { name: "ניחושים קודמים" });
    const clue = within(history).getByRole("img", { name: "0 שחורים, 0 לבנים" });
    expect(clue.children).toHaveLength(0);
  });

  test("an incomplete guess warns instead of submitting", async () => {
    const user = renderApp();
    await startGame(user);
    await pickColors(user, ["אדום"]);
    await user.click(screen.getByRole("button", { name: "נחש!" }));
    expect(await screen.findByText("צריך למלא את כל המקומות לפני ניחוש")).toBeInTheDocument();
    expect(mockedSubmitGuess).not.toHaveBeenCalled();
  });

  test("the keyboard picks colors, moves between slots and submits", async () => {
    const user = renderApp();
    await startGame(user);
    mockedSubmitGuess.mockResolvedValue(active(0, 0));

    await user.keyboard("1234");
    expect(slot(1)).toHaveAccessibleName("מקום 1: אדום");
    expect(slot(4)).toHaveAccessibleName("מקום 4: ירוק");

    // Target is back on slot 1; ArrowLeft moves to slot 2, Backspace clears it.
    await user.keyboard("{ArrowLeft}{Backspace}");
    expect(slot(2)).toHaveAccessibleName("מקום 2: ריק");
    await user.keyboard("6{Enter}");

    await waitFor(() => expect(mockedSubmitGuess).toHaveBeenCalledWith("ab12", "AFCD"));
  });

  test("picking a cheat panel suggestion fills the slots", async () => {
    const user = renderApp();
    await startGame(user);
    await user.click(screen.getByRole("button", { name: "רמי הרמאי" }));
    const suggestions = screen.getAllByRole("button", { name: /^בחר:/ });
    await user.click(suggestions[0]);
    // The opening suggestion uses exactly two colors.
    const names = [1, 2, 3, 4].map((i) => slot(i).getAttribute("aria-label")!.split(": ")[1]);
    expect(names).not.toContain("ריק");
    expect(new Set(names).size).toBe(2);
  });
});

describe("vs human", () => {
  test("an impossible score is flagged inline, a full score wins", async () => {
    const user = renderApp();
    await user.click(screen.getByRole("radio", { name: /מול אדם/ }));
    await startGame(user);
    expect(mockedCreateGame).not.toHaveBeenCalled();

    await pickColors(user, ["אדום", "כתום", "צהוב", "ירוק"]);
    // Tap: empty -> white -> black. Make 3 blacks and 1 white.
    for (const index of [1, 2, 3]) {
      await user.click(screen.getByRole("button", { name: `יתד ${index}: ריק` }));
      await user.click(screen.getByRole("button", { name: `יתד ${index}: לבן` }));
    }
    await user.click(screen.getByRole("button", { name: "יתד 4: ריק" }));

    expect(screen.getByRole("alert")).toHaveTextContent("ניקוד שלא יכול לקרות");
    expect(screen.getByRole("button", { name: "נחש!" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "יתד 4: לבן" }));
    expect(screen.getByText("4 שחורים · 0 לבנים")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "נחש!" }));

    expect(await screen.findByRole("heading", { name: "ניצחון!" })).toBeInTheDocument();
    expect(mockedSubmitGuess).not.toHaveBeenCalled();
  });
});

describe("pin colors", () => {
  const openColorEditor = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(screen.getByRole("button", { name: "העדפות" }));
    await user.click(await screen.findByRole("button", { name: "צבעי היתדות" }));
    return screen.findByRole("dialog");
  };

  test("pin 6 can be white instead of purple; the server still gets its letter", async () => {
    const user = renderApp();
    const editor = await openColorEditor(user);
    await user.click(within(editor).getByRole("button", { name: "יתד 6: סגול" }));
    await user.click(within(editor).getByRole("button", { name: "לבן" }));
    expect(within(editor).getByRole("button", { name: "יתד 6: לבן" })).toBeInTheDocument();
    await user.click(within(editor).getByRole("button", { name: "Close" }));

    await startGame(user);
    mockedSubmitGuess.mockResolvedValue(active(0, 0));
    await pickColors(user, ["לבן", "לבן", "לבן", "לבן"]);
    expect(slot(1)).toHaveAccessibleName("מקום 1: לבן");
    await user.click(screen.getByRole("button", { name: "נחש!" }));
    expect(mockedSubmitGuess).toHaveBeenCalledWith("ab12", "FFFF");

    // The choice is remembered for the next visit.
    expect(JSON.parse(localStorage.getItem("bul-pgia.palette")!)[5]).toBe("white");
  });

  test("a color already in use swaps between the two pins", async () => {
    const user = renderApp();
    const editor = await openColorEditor(user);
    await user.click(within(editor).getByRole("button", { name: "יתד 6: סגול" }));
    await user.click(within(editor).getByRole("button", { name: "אדום (יתחלף עם יתד 1)" }));
    expect(within(editor).getByRole("button", { name: "יתד 1: סגול" })).toBeInTheDocument();
    expect(within(editor).getByRole("button", { name: "יתד 6: אדום" })).toBeInTheDocument();

    await user.click(within(editor).getByRole("button", { name: "איפוס לצבעי ברירת המחדל" }));
    expect(within(editor).getByRole("button", { name: "יתד 1: אדום" })).toBeInTheDocument();
  });

  test("changing a color mid-game repaints the board and history", async () => {
    const user = renderApp();
    await startGame(user);
    mockedSubmitGuess.mockResolvedValue(active(0, 0));
    await pickColors(user, ["אדום", "אדום", "כתום", "כתום"]);
    await user.click(screen.getByRole("button", { name: "נחש!" }));
    const history = await screen.findByRole("region", { name: "ניחושים קודמים" });
    expect(within(history).getAllByRole("button", { name: "אדום" })).toHaveLength(2);

    const editor = await openColorEditor(user);
    await user.click(within(editor).getByRole("button", { name: "שחור" })); // pin 1 is selected by default
    await user.click(within(editor).getByRole("button", { name: "Close" }));

    expect(within(history).getAllByRole("button", { name: "שחור" })).toHaveLength(2);
    expect(within(history).queryByRole("button", { name: "אדום" })).toBeNull();
    expect(slot(1)).toHaveAccessibleName("מקום 1: שחור");
  });

  test("a corrupt saved palette falls back to the default colors", () => {
    localStorage.setItem("bul-pgia.palette", '["red","red"]');
    renderApp();
    // Start screen renders and the game uses default names.
    expect(screen.getByRole("button", { name: "התחל!" })).toBeInTheDocument();
  });
});
