export const Option = ({
  onSelect,
  option,
}: {
  onSelect: (colors: string[]) => void;
  option: string[];
}) => {
  return (
    <div onClick={() => onSelect(option)} className="flex-row option-row">
      {option.map((color, index) => (
        <span key={index} className={color + " marked colorOption"}>
          {color[0].toUpperCase()}
        </span>
      ))}
    </div>
  );
};
export default Option;
