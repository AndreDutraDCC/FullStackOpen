const Notification = ({notification}) => {
    if(notification === null) {
        return null
    }

    const {message, color} = notification

    const notificationStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        <div className='notification' style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification