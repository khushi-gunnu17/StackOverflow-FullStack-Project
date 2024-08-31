
// states = []: The initial state is an empty array ([]), indicating there are no users initially.

const usersreducer = (states = [], action) => {
    switch (action.type) {
        case "FETCH_USERS" :
            return action.payload

        case "UPDATE_CURRENT_USER" :
            return states.map((state) => state._id === action.payload._id ? action.payload : state)
            // It checks each user object (state) in the array to see if its _id matches action.payload._id (the updated user's _id).

        default :
            return states
    }
}

export default usersreducer