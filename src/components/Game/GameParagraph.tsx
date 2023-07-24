import { GameType } from "../../types/Game";
import { H2 } from "../utils/Headings";

export function GameParagraph({ game }: { game: GameType }) {
  return (
    <div>
      <H2
        text={
          game && game["game_id"]
            ? `סיבוב מספר ${game.turnCount! + 1}`
            : "אוי שמוי! יש יש תקלה במשחק. נסה לרענן את העמוד"
        }
      />
    </div>
  );
}
