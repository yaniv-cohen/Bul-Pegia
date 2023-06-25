import { useState } from "react";
import { Logo } from "./Logo/Logo";
import { IconGear } from "./PrefencesTab/GearsIcon";
import { PreferencesTab } from "./PrefencesTab/PreferencesTab";

export const GameHeader = ({ children, ...rest }: any) => {
    const [showPreferences, setShowPreferences] = useState<boolean>();

    const toggleShowPreferences = () => {
        setShowPreferences(!showPreferences)
    }

    return (
        <header>
            <div style={{
                // width: "800px",
                gap:"40px",
                padding: "20px", display: "flex",
                flexDirection: "row",
                justifyContent: "space-betweens"
            }}>
                <Logo></Logo>
                <div>
                    <div onClick={toggleShowPreferences}>
                        <IconGear ></IconGear>
                    </div>

                    {showPreferences ?
                        <PreferencesTab toggleResetOnSubmit={rest.toggleResetOnSubmit} resetOnSubmit={rest.resetOnSubmit} />
                        : <></>}
                </div>
            </div>
            {children}
        </header>)
}