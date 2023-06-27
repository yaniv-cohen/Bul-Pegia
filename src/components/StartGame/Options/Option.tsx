export const Option = ({
    text,
    currentValue,
    children
}: {
    text: string,
    currentValue: any,
    children: any
}) => (
    <div className={"Option"}>
        <h3>{text}</h3>
        <h3>{currentValue}</h3>
        {children}
    </div>
)
