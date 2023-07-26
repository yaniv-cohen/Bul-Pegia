import { Card } from "@chakra-ui/react";
import { Option } from "../../StartGame/Options/Option";
import { FlexColumn } from "../../utils/FlexColoumn";
import { SwitchRect } from "../../utils/Switch";
export const PreferencesTab = ({ toggleResetOnSubmit, resetOnSubmit }: {
    toggleResetOnSubmit: () => void, resetOnSubmit: boolean
}) => {
    return (
        <Card>
            <FlexColumn>

                <Option text="מחק בחירה אחרי ניחוש:" currentValue={resetOnSubmit}>
                    <div>
                        <button style={{ padding: "10px" }}
                            onClick={() => { toggleResetOnSubmit() }}>
                            {resetOnSubmit ? "כן" : "לא"}
                        </button>
                    </div>
                    <SwitchRect value={resetOnSubmit} toggleFunction={toggleResetOnSubmit}></SwitchRect>
                </Option>
            </FlexColumn>
        </Card>

    )
} 
