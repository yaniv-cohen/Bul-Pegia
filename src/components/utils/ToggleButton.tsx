export const ToggleButton = ({ fn, text }: { fn: Function, text: string }) => {
    return <button style={{ "padding": "10px" }} onClick={() => fn()}>{text}</button>;
};
