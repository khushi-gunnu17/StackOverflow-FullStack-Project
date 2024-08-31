// chatReducer.js
const initialState = {
    roomId: null,
    messages: [],
};

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_ROOM':
            return {
                ...state,
                roomId: action.payload,
                messages: [],
            };
        case 'JOIN_ROOM':
            return {
                ...state,
                roomId: action.payload,
                messages: [],
            };
        case 'SEND_MESSAGE':
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case 'LEAVE_ROOM':
            return initialState;
        default:
            return state;
    }
};

export default chatReducer;
