
const authreducer = (state = {data : null}, action) => {
    switch  (action.type) {
        case "AUTH" : 
            localStorage.setItem("Profile", JSON.stringify({...action?.data}))
            return {...state, data : action?.data}

        case "LOGOUT" :
            localStorage.clear()
            return {...state, data : null}

        default : 
            return state
    }
}

export default authreducer


// The authreducer is a function that takes the current state and an action as arguments, and returns a new state based on the action type. It's used to handle user authentication states.

// Reducers: Functions that take the current state and an action, and return a new state based on the action type.

// State Management: The reducer updates the state of the app based on the actions it receives, helping the app keep track of whether a user is logged in or not.