import * as api from '../api/index.js'
import { setcurrentuser } from './currentuser.js'
import { fetchallusers } from './users.js'


// Signup action creator
export const signup = (authdata, navigate) => async(dispatch) => {
    try {

        const {data} = await api.signup(authdata)

        // Dispatches an action with type "AUTH" and the received data to update the Redux store (likely setting the authentication state).
        dispatch({type : "AUTH", data })

        //Dispatches the setcurrentuser action to update the current user state in the Redux store using the profile data stored in localStorage.
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))       

        //  Dispatches the fetchallusers action to update the list of users in the Redux store.
        dispatch(fetchallusers())   
        
        navigate("/")       // Navigates the user to the home page ("/") after successful signup.
        
    } catch (error) {
        console.log(error);
    }
}


// login action creator
export const login = (authdata, navigate) => async(dispatch) => {
    try {

        const {data} = await api.login(authdata)

        dispatch({type : "AUTH", data })
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
        navigate("/")
        
    } catch (error) {
        console.log(error);
    }
}