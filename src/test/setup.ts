import "@testing-library/jest-dom/vitest";

// jsdom has no matchMedia. Answer (min-width/max-width: Nem|Npx) queries as a
// desktop-sized window so Chakra's breakpoint hooks work.
export const TEST_WINDOW_WIDTH = 1280;

const matches = (query: string) =>
  [...query.matchAll(/\((min|max)-width:\s*([\d.]+)(em|px)\)/g)].every(([, kind, value, unit]) => {
    const px = Number(value) * (unit === "em" ? 16 : 1);
    return kind === "min" ? TEST_WINDOW_WIDTH >= px : TEST_WINDOW_WIDTH <= px;
  });

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});
