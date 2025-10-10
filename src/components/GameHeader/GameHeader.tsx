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
        <div>
            <header className={"GameHeader"}>
                <Logo ></Logo>
                <div>
                    <div onClick={toggleShowPreferences} >
                        <IconGear ></IconGear>
                    </div>

                    {showPreferences ?
                        <PreferencesTab toggleResetOnSubmit={rest.toggleResetOnSubmit} resetOnSubmit={rest.resetOnSubmit} />
                        : <></>}
                </div>
                
            </header>
            {children}
        </div>)
}