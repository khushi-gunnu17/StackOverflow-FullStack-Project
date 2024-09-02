import * as api from "../api"


import axios from 'axios';

export const sendCodeRequestNotification = (notificationData) => async (dispatch) => {
    try {
        const { data } = await axios.post('/notifications/send-code-request-notification', notificationData);

        dispatch({ type: 'NOTIFICATION_SENT', payload: data });
    } catch (error) {
        console.error('Error sending notification:', error);
        dispatch({ type: 'NOTIFICATION_ERROR', payload: error.message });
    }
};


export const askquestion = (questiondata, navigate) => async(dispatch) => {
    try {
        const {data} = await api.postquestion(questiondata)

        dispatch({
            type : "POST_QUESTION", 
            payload : data
        })

        // Dispatches the fetchallquestion action to refresh the list of all questions.
        dispatch(fetchallquestion())

        navigate("/")
        
    } catch (error) {
        console.log(error);
    }
}







export const fetchallquestion = () => async(dispatch) => {
    try {

        const {data} = await api.getallquestion()

        dispatch({
            type : "FETCH_ALL_QUESTIONS",
            payload : data
        })

    } catch (error) {
        console.log(error);
    }
}







export const deletequestion = (id, navigate) => async(dispatch) => {
    try {

        await api.deletequestion(id)
        dispatch(fetchallquestion())
        navigate("/")
        
    } catch (error) {
        console.log(error);
    }
}







export const votequestion = (id, value, userid) => async(dispatch) => {
    try {

        await api.votequestion(id, value, userid)
        dispatch(fetchallquestion())
        
    } catch (error) {
        console.log(error);
    }
}







export const PostAnswer = (answerdata) => async(dispatch) => {
    try {

        const {id, noofanswers, answerbody, useranswered, userid} = answerdata
        const {data} = await api.postanswer(id, noofanswers, answerbody, useranswered, userid )

        dispatch({
            type : "POST_ANSWER",
            payload : data
        })

        dispatch(fetchallquestion())
        
    } catch (error) {
        console.log(error);
    }
}







export const deleteanswer = (id, answerid, noofanswers) => async(dispatch) => {
    try {

        await api.deleteanswer(id, answerid, noofanswers)
        dispatch(fetchallquestion())
        
    } catch (error) {
        console.log(error);
    }
}
