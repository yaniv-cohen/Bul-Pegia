import { Button } from "@chakra-ui/react"
import { MainCard } from "../utils/MainCard"
import { StartGameOptions } from "./StartGameOptions"



export const StartHeader = ({
    startGameFunction,
    optionsCount,
    slotsCount,
    setSlotsCount
}: {
    slotsCount: number,
    startGameFunction: Function,
    optionsCount: number,
    setSlotsCount: Function,
}) => (
    <MainCard>
        <StartGameOptions
            slotsCount={slotsCount}
            startGameFunction={startGameFunction}
            optionsCount={optionsCount}
            setSlotsCount={setSlotsCount}
        />
        <div>
            <p>בחרתי צירוף של {slotsCount} צבעים</p>
            <p>?האם תצליחו לנחש מה בחרתי</p>
            {/* <img width={"180px"} src="https://www.pngitem.com/pimgs/m/475-4755815_transparent-hitler-clipart-hitler-cute-anime-girl-hd.png" alt="" /> */}
        </div>
        <Button onClick={() => { startGameFunction(true) }}>התחל!</Button>
    </MainCard>

)