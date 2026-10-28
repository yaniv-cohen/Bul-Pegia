import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { theme } from "./theme";
import { PaletteProvider } from "./hooks/usePalette";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PaletteProvider>
        <App />
      </PaletteProvider>
    </ChakraProvider>
  </React.StrictMode>
);
