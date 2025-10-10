export const Option = ({
    text,
    currentValue,
    onclick,
    children
}: {
    text: string,
    currentValue?: any,
    onclick?: () => void,
    children: any
}) => (
    <div className={"Option"}>
        <h3  onClick={onclick}>{text}</h3>
        <h3  onClick={onclick}>{currentValue}</h3>
        {children}
    </div>
)
