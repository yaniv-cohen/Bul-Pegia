import { useState } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import CheatPanel from "./CheatPanel/CheatPanel";
import HistoryPanel from "./HistoryPanel/HistoryPanel";
import { Slots } from "./Slots/Slots";
import { ColorButtonPalette } from "./ColorPalette/ColorButtonPalette";
import { HumanScore } from "./HumanScore/HumanScore";
import { KeyPegState, keyPegsToResult } from "./KeyPegs/KeyPegs";
import { getFirstEmptyIndex } from "../../utils/getFirstEmptyIndex";
import { validResult } from "../../utils/validResult";
import { getValidGuess } from "../../logic/getValidGuess";
import { GameController, SubmitOutcome } from "../../hooks/useGame";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";

const OUTCOME_MESSAGES: Record<Exclude<SubmitOutcome, "ok">, string> = {
  incomplete: "צריך למלא את כל המקומות לפני ניחוש",
  duplicate: "כבר ניחשת את הרצף הזה",
  error: "תקלה בתקשורת עם השרת, נסה שוב",
};

const emptyScore = (slotsCount: number): KeyPegState[] => new Array(slotsCount).fill("empty");

export const Game = ({ controller }: { controller: GameController }) => {
  const { chosenOptions, setChosenOption, settings, game, rounds, possibleOptions } = controller;
  const { slotsCount, vsComputer, maxTurns } = settings;
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false }) ?? false;
  const cheatDrawer = useDisclosure();
  const [showCheat, setShowCheat] = useState(false);
  const [targetSlot, setTargetSlot] = useState(0);
  const [scorePegs, setScorePegs] = useState(() => emptyScore(slotsCount));
  const [submitting, setSubmitting] = useState(false);

  const manualScore = keyPegsToResult(scorePegs);
  const scoreError =
    !vsComputer && !validResult(manualScore, slotsCount)
      ? `${manualScore.black} שחורים ולבן אחד זה ניקוד שלא יכול לקרות`
      : undefined;
  const contradiction = !vsComputer && rounds.length > 0 && possibleOptions.length === 0;
  const guess = getValidGuess(chosenOptions);
  const guessReady =
    !!guess && !scoreError && !rounds.some((round) => round.input === guess);

  const jumpToNextSlot = () => {
    const nextEmptySlotIndex = getFirstEmptyIndex(chosenOptions, targetSlot);
    if (nextEmptySlotIndex !== undefined) {
      setTargetSlot(nextEmptySlotIndex);
    } else {
      setTargetSlot(targetSlot >= slotsCount - 1 ? 0 : targetSlot + 1);
    }
  };

  const pickLetter = (letter: string) => {
    setChosenOption(targetSlot, letter);
    jumpToNextSlot();
  };

  const submit = async () => {
    if (submitting || scoreError) return;
    setSubmitting(true);
    const outcome = await controller.submit(vsComputer ? undefined : manualScore);
    setSubmitting(false);
    if (outcome === "ok") {
      setScorePegs(emptyScore(slotsCount));
      if (controller.resetOnSubmit) setTargetSlot(0);
      return;
    }
    if (!toast.isActive(outcome)) {
      toast({
        id: outcome,
        status: outcome === "error" ? "error" : "warning",
        title: OUTCOME_MESSAGES[outcome],
        position: "top",
        duration: 2500,
      });
    }
  };

  useKeyboardControls({
    letters: controller.usedLetters,
    slotsCount,
    targetSlot,
    setTargetSlot,
    pickLetter,
    clearSlot: () => setChosenOption(targetSlot, null),
    submit,
  });

  const selectSuggestion = (letters: string[]) => {
    controller.setChosenOptions(letters);
    cheatDrawer.onClose();
  };
  const cheatPanel = <CheatPanel onSelect={selectSuggestion} options={possibleOptions} />;

  return (
    <main className="GameScreen">
      <section className="Controls" aria-label="בחירת צבעים">
        <ColorButtonPalette
          letters={controller.usedLetters}
          pickLetter={pickLetter}
          jumpToNextSlot={jumpToNextSlot}
          showShortcuts={!isMobile}
        />
      </section>

      <section className="Board">
        <header className="Board__header">
          <h2 className="Board__title">
            {"סיבוב "}
            <strong>{game.turnCount + 1}</strong>
            <span className="Board__max">{` / ${maxTurns}`}</span>
          </h2>
          {isMobile && (
            <Button size="sm" variant="outline" colorScheme="whiteAlpha" color="white" onClick={cheatDrawer.onOpen}>
              {"רמי הרמאי"}
            </Button>
          )}
        </header>

        <Slots chosenOptions={chosenOptions} targetSlot={targetSlot} setTargetSlot={setTargetSlot} />

        {!vsComputer && <HumanScore pegs={scorePegs} setPegs={setScorePegs} error={scoreError} />}

        <Button
          size="lg"
          className={"GuessButton" + (guessReady ? " GuessButton--ready" : "")}
          variant={guessReady ? "solid" : "outline"}
          alignSelf="center"
          width={isMobile ? "100%" : "auto"}
          minWidth="220px"
          onClick={submit}
          isLoading={submitting}
          isDisabled={!!scoreError}
          data-ready={guessReady}
        >
          {"נחש!"}
        </Button>
        {contradiction && (
          <p className="Board__warning" role="alert">
            {"הניקוד שהוזן עד עכשיו סותר את עצמו - אין רצף שמתאים לכל התוצאות"}
          </p>
        )}
        {!isMobile && (
          <p className="Board__hint">
            {`מקלדת: 1–${controller.usedLetters.length} לבחירת צבע · חיצים למעבר · Backspace למחיקה · Enter לניחוש`}
          </p>
        )}

        <HistoryPanel setChosenOption={setChosenOption} rounds={rounds} />
      </section>

      {isMobile ? (
        <Drawer isOpen={cheatDrawer.isOpen} onClose={cheatDrawer.onClose} placement="bottom">
          <DrawerOverlay />
          <DrawerContent borderTopRadius="xl" maxH="80vh">
            <DrawerCloseButton />
            <DrawerHeader>{"רמי הרמאי"}</DrawerHeader>
            <DrawerBody pb={6}>{cheatPanel}</DrawerBody>
          </DrawerContent>
        </Drawer>
      ) : (
        <aside className="CheatColumn">
          <Button variant={showCheat ? "ghost" : "outline"} onClick={() => setShowCheat(!showCheat)}>
            {showCheat ? "הסתר את רמי" : "רמי הרמאי"}
          </Button>
          {showCheat && cheatPanel}
        </aside>
      )}
    </main>
  );
};
