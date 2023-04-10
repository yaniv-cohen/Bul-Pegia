export const Circle = ({
  color = "white",
  side,
}: {
  color: string;
  side: number;
}) => {
  return (
    <svg viewBox={`0 0 ${side} ${side}`}>
      <circle fill={color} cx={side*0.5 +'px'} cy={side*0.5 +'px'} r={side/2 +'px'} />
    </svg>
  );
};
export default Circle;
