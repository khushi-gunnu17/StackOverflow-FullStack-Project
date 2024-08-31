import * as api from "../api/index.js"

// The function doesn't take any parameters and returns another function that takes dispatch as an argument. This is a typical pattern in Redux Thunk for handling asynchronous actions.
export const fetchallusers = () => async(dispatch) => {
    try {

        // The response is destructured to get the data property, which contains the list of users.
        const {data} = await api.getallusers()

        // Dispatches an action with the type "FETCH_USERS" and a payload containing the fetched users' data. This action is sent to the Redux store, where a reducer will handle it to update the state.
        dispatch({
            type : "FETCH_USERS",
            payload : data
        })
        
    } catch (error) {
        console.log(error)
    }
}


export const updateprofile = (id, updatedata) => async(dispatch) => {
    try {

        const {data} = await api.updateprofile(id, updatedata)
        
        dispatch({
            type : "UPDATE_CURRENT_USER",
            payload : data
        })
        
    } catch (error) {
        console.log(error);
    }
}