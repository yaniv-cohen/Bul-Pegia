import { extendTheme } from "@chakra-ui/react";

// Colors mirror the CSS tokens in colorPalette.scss
export const theme = extendTheme({
  direction: "rtl",
  fonts: {
    heading: "Rubik, system-ui, sans-serif",
    body: "Rubik, system-ui, sans-serif",
  },
  colors: {
    brand: {
      50: "#fff0f0",
      100: "#ffd6d6",
      200: "#ffb3b3",
      300: "#ff8f8f",
      400: "#ff7a7a",
      500: "#ff6b6b",
      600: "#f04848",
      700: "#c93434",
      800: "#9e2626",
      900: "#701a1a",
    },
    ink: {
      50: "#eef0fa",
      100: "#d5d8ee",
      200: "#b2b7dc",
      300: "#8b91c4",
      400: "#5f66a3",
      500: "#3c4380",
      600: "#2f3566",
      700: "#262b52",
      800: "#1b1f3b",
      900: "#121530",
    },
  },
  radii: {
    xl: "16px",
  },
  styles: {
    global: {
      body: {
        bg: "#1b1f3b",
        color: "#1b1f3b",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: 700,
      },
      defaultProps: {
        colorScheme: "brand",
      },
    },
    Switch: {
      defaultProps: {
        colorScheme: "brand",
      },
    },
  },
});
