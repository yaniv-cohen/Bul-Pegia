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
      onClick={() => {
        console.log(option);
        setSelection(option);
      }}
      className="flex-row" 
    >
      {option.map((char) => (
        <span className={char}>{ char+', '}</span>
      ))}
    </div>
  );
};
export default Option;
