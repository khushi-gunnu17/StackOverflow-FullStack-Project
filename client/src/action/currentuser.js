export const setcurrentuser = (data) => {
    return {
        type : "FETCH_CURRENT_USER",
        payload : data
    }
}

// Action types are used by reducers to determine how to update the state based on the action received.

// payload: This property carries the data that is needed to update the state. In this case, payload is set to data, which is the user data passed to the setcurrentuser function.