export const Difficulty = ({
  value,
  maxValue,
}: {
  value: number;
  maxValue: number;
}) => {
  return (
    <div>
      {new Array(maxValue).fill(null).map((_, index) => {
        if (value < index) {
          return <span>1</span>;
        } else {
          return <span>0</span>;
        }
      })}
    </div>
  );
};
