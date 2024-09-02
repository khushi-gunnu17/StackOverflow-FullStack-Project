import {combineReducers} from "redux"
import authreducer from "./auth.js"
import currentuserreducer from "./currentuser.js"
import usersreducer from "./users.js"
import questionreducer from "./question.js"
import notificationReducer from "./notification.js"

export default combineReducers({
    authreducer,
    currentuserreducer,
    usersreducer,
    questionreducer,
    notificationReducer,
})