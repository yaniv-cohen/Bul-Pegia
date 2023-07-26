export const StatsItem = ({
  title,
  value,
  children,
}: {
  title: string;
  value?: string | React.ReactNode;
  children?: any;
}) => {
  if (!title || (!value && !children)) return <></>;
  return (
    <li className="FlexRow spaced-rtl ">
      <span>{title + ":"}</span>
      {value ? <span className="container">{value}</span> : <></>}
      {children}
    </li>
  );
};
