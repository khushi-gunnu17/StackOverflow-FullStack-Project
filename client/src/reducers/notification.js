const notificationReducer = (state = { notification: null, error: null }, action) => {
    switch (action.type) {
        case "NOTIFICATION_SENT":
            return {
                ...state,
                notification: action.payload, 
                error: null,    
            };

        case "NOTIFICATION_ERROR":
            return {
                ...state,
                error: action.payload,       
            }

        default :
            return state
    }
}

export default notificationReducer