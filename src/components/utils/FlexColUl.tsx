export const FlexColUl = ({
  className,
  children,
}: {
  className?: string;
  children: any;
}) => {
  return <ul className={"FlexColoumn FlexUl " + className}>{children}</ul>;
};
