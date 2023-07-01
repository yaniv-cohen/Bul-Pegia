export const SwitchRect = ({ value, toggleFunction }: { value: boolean, toggleFunction: () => void }) => {

    return (
        <label className="switch">
            <input type="checkbox" checked={value} onClick={() => toggleFunction()} />
            <span className="slider round"></span>
        </label>
    )
}
export const SwitchRound = () => {
    return (
        <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
        </label>
    )
}