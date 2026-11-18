import { getAllPermutations } from "../utils/getAllPermutations";
import { chooseBest, WORK_BUDGET } from "./chooseBest";
import { filterOptions } from "./filterOptions";
import { getResult } from "./getResult";

const split = (codes: string[]) => codes.map((code) => code.split(""));

/** Deterministic random numbers for the sampling path. */
const seeded = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

test("a single option is chosen", () => {
  expect(chooseBest([["A", "B", "C"]])).toEqual(["A", "B", "C"]);
});

test("picks a guess that tells every remaining option apart, even if it can't be the answer", () => {
  const remaining = split(["AB", "AC", "AD"]);
  const all = getAllPermutations(["A", "B", "C", "D"], 2);
  const best = chooseBest(remaining, all);

  // Any guess from the remaining options leaves AC and AD looking the same.
  expect(remaining.map((r) => r.join(""))).not.toContain(best.join(""));
  const scores = remaining.map((option) => JSON.stringify(getResult(best, option)));
  expect(new Set(scores).size).toBe(3);
});

test("on a tie, prefers a guess that could still be the answer", () => {
  const remaining = split(["AB", "AC", "BC"]);
  // BA splits these three as well as AB does, and comes first.
  const all = split(["BA", "AB", "AC", "BC"]);
  expect(chooseBest(remaining, all)).toEqual(["A", "B"]);
});

test("large boards are sampled, and sampling is repeatable with the same random source", () => {
  const all = getAllPermutations(["A", "B", "C", "D", "E", "F"], 6);
  expect(all.length * all.length).toBeGreaterThan(WORK_BUDGET);
  const first = chooseBest(all, all, seeded(1));
  expect(first).toHaveLength(6);
  expect(chooseBest(all, all, seeded(1))).toEqual(first);
});

test("following the recommendation solves 4 slots / 6 colors quickly", () => {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const all = getAllPermutations(letters, 4);
  const opener = chooseBest(all, all);
  const secrets = all.filter((_, i) => i % 26 === 0);

  const turnsPerGame = secrets.map((secret) => {
    let remaining = all;
    let guess = opener;
    for (let turn = 1; turn <= 10; turn++) {
      const result = getResult(guess, secret);
      if (result.black === 4) return turn;
      remaining = filterOptions(4, letters, guess, result, remaining);
      guess = chooseBest(remaining, all);
    }
    return Infinity;
  });

  const average = turnsPerGame.reduce((sum, turns) => sum + turns, 0) / turnsPerGame.length;
  expect(Math.max(...turnsPerGame)).toBeLessThanOrEqual(6);
  expect(average).toBeLessThanOrEqual(4.6);
}, 30_000);
