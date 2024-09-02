import axios from "axios"

const API = axios.create({
    baseURL : "https://stackoverflow-fullstack-project.onrender.com"
})


// An interceptor is a way to run some code every time a request is made or a response is received. In this case, it's a request interceptor, meaning it will run before every outgoing request.

// API.interceptors.request.use: This sets up an interceptor for all requests made using the API instance. API is an instance of Axios created with axios.create().

// localStorage.getItem("Profile"): This checks if there is an item named "Profile" stored in the browser's local storage. Local storage is a way to store data in the browser that persists even after the user closes the browser.

// req.headers.Authorization: This sets the Authorization header of the request. Headers are pieces of information that are sent with the request to the server.

// Bearer ${...}: The Authorization header is set to Bearer followed by the token. This is a common way to send authentication tokens in HTTP requests.

// In summary, this code down below ensures that every time you make a request, if you are logged in (determined by the presence of a "Profile" in local storage), your request will include an authorization token. This token lets the server know that you are an authenticated user, allowing you to access protected resources or perform certain actions.


API.interceptors.request.use((req) => {
    if (localStorage.getItem("Profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("Profile")).token
        }`
    }
    return req
})

// This interceptor function runs before each request (req) is sent. It checks if there's an item called "Profile" in localStorage. If it exists, it adds an Authorization header to the request using a JWT token stored in "Profile". This is useful for authenticating requests that require user authorization.



export const login = (authdata) => API.post("user/login", authdata)
export const signup = (authdata) => API.post("user/signup", authdata)
export const getallusers = () => API.get("/user/getallusers")
export const updateprofile = (id, updatedata) => API.patch(`user/update/${id}`, updatedata)


export const postquestion = (questiondata) => API.post("questions/askques", questiondata)
export const getallquestion = () => API.get("questions/get")
export const deletequestion = (id) => API.delete(`/questions/delete/${id}`)
export const votequestion = (id, value, userid) => API.patch(`/questions/vote/${id}`, {value, userid})


export const postanswer = (id, noofanswers, answerbody, useranswered, userid) => API.patch(`answers/post/${id}`, {noofanswers, answerbody, useranswered, userid})
export const deleteanswer = (id, answerid, noofanswers) => API.patch(`/answers/delete/${id}`, {answerid, noofanswers})
