import { useState } from "react"
import { FlexColUl } from "../../utils/FlexColUl"
import { ColorButton } from "./ColorButton"

export const ColorButtonPallete = ({ colors,
    setOptionByCurrentSlot, jumpToNextSlot }: {
        colors: string[],
        setOptionByCurrentSlot: (color: string) => void,
        jumpToNextSlot: () => void
    }) => {
    const [lastClickedIndex, setLastClickedIndex] = useState<null | number>(null)
    const checkIfsameButtonClick = (newClickIndex: number) => {
        if (newClickIndex === lastClickedIndex) {
            jumpToNextSlot()
        }
    }
    return (
        <FlexColUl >
            {
                colors.map((color, index) => (
                    <ColorButton
                        onClick={() => {
                            checkIfsameButtonClick(index)
                            setLastClickedIndex(index)
                            setOptionByCurrentSlot(color)
                        }}
                        key={index}
                        color={color}

                    />
                ))
            }
        </FlexColUl>

    )
}