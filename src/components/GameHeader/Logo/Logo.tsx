import MainLogo from "../../../../assets/logo3.jpg";
export const Logo = ({ onLogoClick }: { onLogoClick: () => void }) => (
  <div onClick={onLogoClick}>
    <img src={MainLogo} alt="bul pgia" className="Logo" />
    </div>
);