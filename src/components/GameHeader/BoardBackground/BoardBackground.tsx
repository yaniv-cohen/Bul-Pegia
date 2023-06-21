import BackgroundImage from '../../../assets/Wooden.jpg'

export const BoardBackground = () => {
    return (
        <div style={{
            position: "absolute",
            display: 'flex',
            marginLeft: 'auto',
            marginRight: 'auto',
            top: 0,
            zIndex: -1
        }}>
            <img
                src={BackgroundImage}
                alt='woodenBoard'
            >
            </img>
        </div>

    )
} 