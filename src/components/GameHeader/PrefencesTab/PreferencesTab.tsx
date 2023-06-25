import { Card } from "@chakra-ui/react";
export const PreferencesTab = ({ toggleResetOnSubmit, resetOnSubmit }: {
    toggleResetOnSubmit: Function, resetOnSubmit: boolean
}) => {
    // const clicked = (fn: Function) => {
    //     fn()
    // }
    return (
        <Card>
            <button onClick={() => { toggleResetOnSubmit() }}>
                {"resetOnsubmit ? " + resetOnSubmit}
            </button>
        </Card>

    )
} 
