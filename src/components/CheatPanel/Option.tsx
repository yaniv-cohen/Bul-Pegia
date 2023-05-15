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
        <span>{char}</span>
      ))}
    </div>
  );
};
export default Option;
