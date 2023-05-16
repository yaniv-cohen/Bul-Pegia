import { LETTER_OPTIONS } from "../../utils/letters";

export const Option = ({
  setSelection,
  option,
}: {
  setSelection: Function;
  option: string[];
}) => {
  return (
    <div
      // onTouchMoveCapture={}
      onClick={() => {
        setSelection(option);
        window.scrollTo(0, 0);
      }}
      className="flex-row option-row"
    >
      {option.map((char, index) => (
        <span key={index} className={char + ' marked colorOption'}>{char[0].toUpperCase() + ', '}</span>
      ))}
    </div>
  );
};
export default Option;
