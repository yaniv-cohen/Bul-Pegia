

export const OptionsIncrementCard = ({ optionsCount, slotsCount, min, max, func1 }:
    { optionsCount: number, slotsCount: number, min: number, max: number, func1: Function }) => {
    const scrollForward = () => { func1(Math.min(max, slotsCount + 1)) }
    const scrollBackward = () => { func1(Math.max(min, slotsCount - 1)) }

    return (
        <div>
            <p>{"number of colors " + optionsCount}</p>
            <button onClick={() => console.log("-")}>-</button>
            <button onClick={() => console.log("+")}>+</button>
        </div>
    )
}