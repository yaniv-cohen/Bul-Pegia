import { Button } from "@chakra-ui/react"



export const StartHeader = ({ slotsCount, startGameFunction }: { slotsCount: number, startGameFunction: Function }) => (<header>
    <h1>בול פגיעה</h1>
    <div>
        <p>בחרתי צירוף של {slotsCount} צבעים</p>
        <p>?האם תצליחו לנחש מה בחרתי</p>

        <Button onClick={() => { startGameFunction(true) }}>התחל!</Button>
        <div>
            <img width={"180px"} src="https://www.pngitem.com/pimgs/m/475-4755815_transparent-hitler-clipart-hitler-cute-anime-girl-hd.png" alt="" />
        </div>
    </div>
</header>)