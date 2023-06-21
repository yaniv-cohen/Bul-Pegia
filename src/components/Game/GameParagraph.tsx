import { Card, CardBody } from "@chakra-ui/react";
import { GameType } from "../../types/Game";

export function GameParagraph({ game }: { game: GameType }) {
    return <Card>
        <CardBody>
            <p>
                {game && game["game_id"]
                    ? ""
                    : "Welcome!"}
            </p>
        </CardBody>
    </Card>
}