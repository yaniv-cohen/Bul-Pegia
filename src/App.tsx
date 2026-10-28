import "./App.scss";
import { StartHeader } from "./components/StartGame/StartHeader";
import { GameHeader } from "./components/GameHeader/GameHeader";
import { Game } from "./components/Game/Game";
import { EndScreen } from "./components/EndScreen/EndScreen";
import { useGame } from "./hooks/useGame";

function App() {
  const controller = useGame();
  const { gameState, endgameResult } = controller;

  return (
    <div className="App">
      <GameHeader
        toggleResetOnSubmit={controller.toggleResetOnSubmit}
        resetOnSubmit={controller.resetOnSubmit}
      >
        {gameState === "start" && <StartHeader controller={controller} />}
        {gameState === "active" && <Game controller={controller} />}
        {gameState === "finished" && endgameResult && (
          <EndScreen endgameResult={endgameResult} playAgain={controller.backToStart} />
        )}
      </GameHeader>
    </div>
  );
}
export default App;
