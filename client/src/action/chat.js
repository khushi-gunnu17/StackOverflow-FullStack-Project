export const createRoom = (roomId) => {
    return {
        type: 'CREATE_ROOM',
        payload: roomId
    };
};

export const joinRoom = (roomId) => {
    return {
        type: 'JOIN_ROOM',
        payload: roomId
    };
};

export const sendMessage = (message) => {
    return {
        type: 'SEND_MESSAGE',
        payload: message
    };
};

export const leaveRoom = () => {
    return {
        type: 'LEAVE_ROOM'
    };
};
