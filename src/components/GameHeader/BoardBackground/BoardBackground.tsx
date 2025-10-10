import BackgroundImage from "/Wooden.jpg"

export const BoardBackground = () => {
    return (
        <div style={{ backgroundImage: BackgroundImage }} id="BoardBackground">
            <img
                src={BackgroundImage}
                alt='woodenBoard'
            >
            </img>
        </div>

    )
} 