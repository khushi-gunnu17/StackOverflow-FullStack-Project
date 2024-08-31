const currentuserreducer = (state = null, action) => {
    switch (action.type) {
        case "FETCH_CURRENT_USER" : 
            return action.payload
            
        default : 
            return state
    }
} 

export default currentuserreducer


// The action object that might modify the state. It contains a type (a string describing the action) and possibly some payload (the data associated with the action).

// FETCH_CURRENT_USER: If the action type is "FETCH_CURRENT_USER", the reducer updates the state to be the value of action.payload.

// In simple terms, this code helps manage and update the state of the currently logged-in user in the application. If the app fetches new information about the current user, the reducer updates its state to reflect that information.