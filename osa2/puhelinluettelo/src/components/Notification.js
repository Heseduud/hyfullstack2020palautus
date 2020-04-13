import React from 'react'

const Notification = ({ msg }) => {
    if (msg === null) {
        return null
    } else if (msg.startsWith('Error')) {
        return (
            <div className="error">
                {msg}
            </div>
        )
    }

    return (
        <div className="notif">
            {msg}
        </div>
    )
}

export default Notification