import { IsAny } from "mongodb";

export const ToggleButton = ({ fn, text, children }: { fn: Function, text: string, children?: any }) => {
    return <button style={{ "padding": "10px" }} onClick={() => fn()}>{text}</button>;
};
