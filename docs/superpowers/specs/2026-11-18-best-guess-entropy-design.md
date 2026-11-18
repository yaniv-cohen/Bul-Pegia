# Better best-guess recommendation (most-information / entropy)

## Context
The user asked to "restore" the best-guess algorithm from the `live_demo1` merge (5a70769). Looking through the
history shows nothing was lost: today's `src/logic/chooseBest.ts` is the same "most shared blacks" heuristic
(only an unused `maxZeroes` counter was removed). The user feels the recommendations are weak and wants a better
heuristic. In their words: "a good guess gives the most information, and need to find correct in least steps".
The user chose the **most information (entropy)** approach.

## Approaches considered
1. **Most information (entropy)**: picked. This is literally "the most information". It averages about 4.4 turns on 4×6.
2. Most distinct scores (max partitions): roughly the same average (about 4.37) and ties more often. Rejected in favor of the user's framing.
3. Knuth minimax (smallest worst case): guarantees ≤5 turns on 4×6, but its average is slightly worse (about 4.5). The user cares about the average.

## Design
**Score of a guess `g`:** split the remaining options into groups by the score (`black`, `white`) that `g` would get
against each one. With group sizes `nᵢ` out of `N`, entropy = `−Σ (nᵢ/N)·log₂(nᵢ/N)`. Pick the highest.

**Candidates:** every code on the board, not only the remaining options. A code that can't be the answer can still
split the remaining options better. Repeat and no-repeat boards follow the same rules as the game.
**Tie-break (my call):** prefer a candidate that is still a possible answer, since it can win immediately. After
that, take the first one found, so results are deterministic.

**Budget (my call):** the work is candidates × remaining options. If that is at most `WORK_BUDGET` (about 2M
comparisons), check everything exactly. 4×6 is always exact (1296 × ≤256 after the first guess). Otherwise:
- candidates = all remaining options (capped by sampling) plus a random sample of other codes,
- if the remaining set is itself huge, estimate entropy against a random sample of it.
An injectable `random` function keeps the tests deterministic.

**Fast path:** 1 option left → return it. 2 options left → return the first one.

**Opening guess (my call):** keep today's two-color opener (`prioritizeTwoColorGuess`). It is a strong opener
and it means the start screen never has to search all 16.7M codes on an 8×8 board.

**Recommendation is stored separately (my call).** Today the recommendation is spliced into `possibleOptions[0]`.
A guess that can't be the answer doesn't belong in that list: it would make "ניחוש מומלץ מתוך N" wrong and
duplicate an entry. That splicing is also why the opening list has 6⁴+1 entries today.

Non-goals: no UI redesign, no Web Worker, no server changes. Two-player (manual score) mode keeps working
because it uses the same filtered list.

## Implementation
1. **`src/logic/chooseBest.ts`**: rewrite as
   `chooseBest(remaining: string[][], allCodes: string[][], random = Math.random): string[]`.
   Reuse `getResult` from `src/logic/getResult.ts`. Group scores with the key `black * 10 + white` in a `Map`.
   Check candidates that are possible answers via a `Set` of joined strings.
2. **`src/hooks/useGame.ts`**:
   - add `allCodes` (computed at `startGame` with the existing `getAllPermutations` / `getAllNonRepeatingPermutations`) and `recommendation: string[] | undefined` state;
   - in `startGame`: `possibleOptions = allCodes`, `recommendation = prioritizeTwoColorGuess(allCodes)[0]` (or change that util so it returns just the opener);
   - in `submit`: after `filterOptions`, set `possibleOptions = newOptions` and `recommendation = newOptions.length ? chooseBest(newOptions, allCodes) : undefined`;
   - expose `recommendation` from the hook.
3. **`src/components/Game/CheatPanel/CheatPanel.tsx`**: take a `recommendation` prop, show it in the
   "ניחוש מומלץ" box, list all `options` (no more `slice(1)`), and keep the count as `options.length`. If the
   recommendation isn't in the list, add a small note: "(לא יכול להיות הפתרון, אבל מצמצם הכי הרבה)".
4. **`src/components/Game/Game.tsx`**: pass `controller.recommendation` to `CheatPanel`.
5. **Tests (vitest)**:
   - `src/logic/chooseBest.test.ts`: replace the old tests with: a single option is returned; on a small hand-checkable board it picks the max-entropy guess; a tie prefers a possible answer; a non-possible guess is returned when it splits strictly better; the sampling path is deterministic with a seeded `random`.
   - Simulation test: on 4×6, play about 50 fixed secrets with recommendation-only play. Assert every game is won in ≤ 6 turns and the average is ≤ 4.7.
   - `src/hooks/useGame.test.ts`: update the opening-length expectation from `6 ** 4 + 1` to `6 ** 4`, and assert `recommendation` is a two-color code.
   - `src/utils/prioritizeTwoColorGuess.test.ts`: adjust if its signature changes.
6. Save this design to `docs/superpowers/specs/2026-11-18-best-guess-entropy-design.md`. Commit on a new branch (main is the current branch), and only when the user asks.

## Verification
- `npm test` passes (including the new simulation test). `npm run typecheck` is clean.
- `npm run dev` + `npm run server`: play 4×6 using only the "רמי הרמאי" suggestion and confirm it wins in about 4–5 turns.
  Try 8 slots × 8 colors and confirm the recommendation appears with no noticeable freeze after a guess.
- Two-player mode: enter manual scores and confirm the recommendation updates, and that the contradiction warning still appears for impossible scores.

## Changes during implementation
- **Opening guess:** chosen by `chooseBest` too (81ms on 4×6, sampled on larger boards), not the two-color opener.
  Measured over all 1296 secrets it averaged better (4.42 vs 4.49 turns), so `prioritizeTwoColorGuess` was removed.
- **Scoring:** uses a fast scorer over number arrays inside `chooseBest` instead of `getResult`, to keep the work budget cheap.

## Results (4 slots / 6 colors, all 1296 secrets)
| Rule | Average turns | Worst |
|---|---|---|
| Old "most blacks" + AAAB opener | 5.21 | 8 |
| Entropy + AAAB opener | 4.49 | 6 |
| Entropy + entropy opener (shipped) | 4.42 | 6 |

Recommendation time: about 130–210ms per turn on 5–7 slots × 8 colors.
