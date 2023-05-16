import { Button } from "@chakra-ui/react"
import { ReactElement } from "react"



export const StartHeader = ({ slotsCount, startGameFunction, children }: {
    slotsCount: number,
    startGameFunction: Function,
    children: any
}) => (<header>
    <h1>בול פגיעה</h1>
    <div>
        <div>
            <p>בחרתי צירוף של {slotsCount} צבעים</p>
            <p>?האם תצליחו לנחש מה בחרתי</p>
            <img width={"180px"} src="https://www.pngitem.com/pimgs/m/475-4755815_transparent-hitler-clipart-hitler-cute-anime-girl-hd.png" alt="" />
        </div>
        {children}
        <Button onClick={() => { startGameFunction(true) }}>התחל!</Button>

    </div>
</header>)