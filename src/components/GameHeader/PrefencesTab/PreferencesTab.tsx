import { Card } from "@chakra-ui/react";
import { IconGear } from "./GearsIcon";

export const PreferencesTab = ({ toggleResetOnSubmit, resetOnSubmit }: {
    toggleResetOnSubmit: Function, resetOnSubmit: boolean
}) => {
    const clicked = (fn: Function) => {
        fn()
        console.log("rerender");

    }
    return (
        <Card>
            <button onClick={() => { clicked(toggleResetOnSubmit) }}>
                {"resetOnsubmit ? " + resetOnSubmit}
            </button>
        </Card>

    )
} 