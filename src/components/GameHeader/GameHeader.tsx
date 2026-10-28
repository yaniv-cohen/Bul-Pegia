import { ReactNode, useState } from "react";
import { Logo } from "./Logo/Logo";
import { IconGear } from "./PreferencesTab/GearsIcon";
import { PreferencesTab } from "./PreferencesTab/PreferencesTab";

export const GameHeader = ({
  children,
  toggleResetOnSubmit,
  resetOnSubmit,
}: {
  children: ReactNode;
  toggleResetOnSubmit: () => void;
  resetOnSubmit: boolean;
}) => {
  const [showPreferences, setShowPreferences] = useState(false);

  return (
    <div>
      <header className="GameHeader">
        <Logo />
        <div>
          <div onClick={() => setShowPreferences(!showPreferences)}>
            <IconGear />
          </div>
          {showPreferences && (
            <PreferencesTab toggleResetOnSubmit={toggleResetOnSubmit} resetOnSubmit={resetOnSubmit} />
          )}
        </div>
      </header>
      {children}
    </div>
  );
};
