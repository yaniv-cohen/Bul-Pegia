export const Option = ({
  setSelection,
  setStartIndex,
  option,
}: {
  setSelection: Function;
  setStartIndex: (arg0: number) => void;
  option: string[];
}) => {
  return (
    <div
      // onTouchMoveCapture={}
      onClick={() => {
        setSelection(option);
        setStartIndex(0);
        window.scrollTo(0, 0);
      }}
      className="flex-row option-row"
    >
      {option?.map((char, index) => (
        <span key={index} className={char + " marked colorOption"}>
          {char[0].toUpperCase() + ", "}
        </span>
      ))}
    </div>
  );
};
export default Option;
