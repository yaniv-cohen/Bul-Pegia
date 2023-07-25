import BackgroundImage from '/assets/Wooden.jpg'

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