
const questionreducer = (state = {data : null}, action) => {

    switch (action.type) {
        case "POST_QUESTION" :
            return {...state}    // action.payload not here in the first one

        case "FETCH_ALL_QUESTIONS" :
            return {...state, data : action.payload}

        case "POST_ANSWER" :
            return {...state}

        case "UPLOAD_VIDEO":
            return {
                ...state,
                data: state.data.map(question =>
                    question._id === action.payload.questionId
                        ? { ...question, videos: [...(question.videos || []), action.payload.video] }
                        : question
                )
            };

        case 'SEND_CODE_REQUEST_NOTIFICATION':
            return {
                ...state,
                notification: action.payload 
            };

        default : 
            return state
    }
}

export default questionreducer