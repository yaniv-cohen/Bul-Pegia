import { useState } from "react";
import { Logo } from "./Logo/Logo";
import { IconGear } from "./PrefencesTab/GearsIcon";
import { PreferencesTab } from "./PrefencesTab/PreferencesTab";
import { MainCard } from "../utils/MainCard";
export const GameHeader = ({ children, onLogoClick, ...rest }: any) => {
    const [showPreferences, setShowPreferences] = useState<boolean>();

    const toggleShowPreferences = () => {
        setShowPreferences(!showPreferences)
    }

    return (
        <MainCard>
            <header className={"GameHeader"}>
                <Logo  onLogoClick={onLogoClick} ></Logo>
                <div>
                    <div className="prefencesButton" onClick={toggleShowPreferences} >
                        <IconGear ></IconGear>
                    </div>

                    {showPreferences ?
                        <PreferencesTab toggleResetOnSubmit={rest.toggleResetOnSubmit} resetOnSubmit={rest.resetOnSubmit} />
                        : <></>}
                </div>
                
            </header>
            {children}
        </MainCard>)
}