import { Button } from "@chakra-ui/react"
import { EndgameResult } from "../../types/EndgameResult"
import { GameState } from "../../types/Game"

export const EndScreen = ({ endgameResult, setGameState }: { endgameResult?: EndgameResult, setGameState: (arg0: GameState) => void }) => {




    return <main>{JSON.stringify(endgameResult)}
        {'נגמר המשחק'}
        <Button onClick={() => {
            setGameState("start")
        }}>{"שחק שוב"}</Button>
    </main>
}