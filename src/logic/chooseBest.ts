/**
 * Recommends the guess that gives the most information about the secret.
 *
 * For each candidate guess, the remaining options are grouped by the score
 * (blacks, whites) the guess would get against them. The candidate whose
 * groups have the highest entropy - the most expected information - wins.
 * Candidates come from every code on the board, because a code that can't be
 * the answer sometimes splits the remaining options best. On a tie, a code
 * that could still be the answer is preferred, since it might win outright.
 *
 * Large boards would take too long to search exactly, so above WORK_BUDGET
 * comparisons the candidates and the remaining options are sampled.
 */

/** Maximum number of guess-vs-option comparisons before sampling kicks in. */
export const WORK_BUDGET = 2_000_000;
/** Maximum number of remaining options scored against each candidate. */
const MAX_SECRETS = 2_000;

const EPSILON = 1e-9;

type Code = number[];

const sample = <T>(items: T[], count: number, random: () => number): T[] => {
  if (items.length <= count) return items;
  const out: T[] = [];
  for (let i = 0; i < count; i++) {
    out.push(items[Math.floor(random() * items.length)]);
  }
  return out;
};

/** Score key: blacks * 16 + total color matches; unique per (black, white). */
const scoreKey = (guess: Code, secret: Code, counts: Int8Array): number => {
  let black = 0;
  counts.fill(0);
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === secret[i]) black++;
    counts[guess[i]]++;
  }
  let matches = 0;
  for (let i = 0; i < secret.length; i++) {
    if (counts[secret[i]] > 0) {
      counts[secret[i]]--;
      matches++;
    }
  }
  return black * 16 + matches;
};

const entropy = (guess: Code, secrets: Code[], counts: Int8Array): number => {
  const groups = new Map<number, number>();
  for (const secret of secrets) {
    const key = scoreKey(guess, secret, counts);
    groups.set(key, (groups.get(key) ?? 0) + 1);
  }
  let total = 0;
  for (const size of groups.values()) {
    const p = size / secrets.length;
    total -= p * Math.log2(p);
  }
  return total;
};

export const chooseBest = (
  remaining: string[][],
  allCodes: string[][] = remaining,
  random: () => number = Math.random
): string[] => {
  if (remaining.length <= 2) return remaining[0];

  // Work on numbers instead of letters for speed.
  const letterIndex = new Map<string, number>();
  const toCode = (letters: string[]): Code =>
    letters.map((letter) => {
      let index = letterIndex.get(letter);
      if (index === undefined) {
        index = letterIndex.size;
        letterIndex.set(letter, index);
      }
      return index;
    });

  const secrets = sample(remaining, MAX_SECRETS, random);
  let candidates: { letters: string[]; possible: boolean }[];
  if (allCodes.length * secrets.length <= WORK_BUDGET) {
    const possible = new Set(remaining.map((option) => option.join("")));
    candidates = allCodes.map((letters) => ({ letters, possible: possible.has(letters.join("")) }));
  } else {
    // Half from the remaining options, half from anywhere on the board.
    const perSource = Math.max(1, Math.floor(WORK_BUDGET / secrets.length / 2));
    candidates = [
      ...sample(remaining, perSource, random).map((letters) => ({ letters, possible: true })),
      ...sample(allCodes, perSource, random).map((letters) => ({ letters, possible: false })),
    ];
  }

  const secretCodes = secrets.map(toCode);
  const counts = new Int8Array(64);
  let best = remaining[0];
  let bestScore = -1;
  let bestPossible = false;
  for (const { letters, possible } of candidates) {
    const score = entropy(toCode(letters), secretCodes, counts);
    const better =
      score > bestScore + EPSILON ||
      (Math.abs(score - bestScore) <= EPSILON && possible && !bestPossible);
    if (better) {
      best = letters;
      bestScore = score;
      bestPossible = possible;
    }
  }
  return best;
};
