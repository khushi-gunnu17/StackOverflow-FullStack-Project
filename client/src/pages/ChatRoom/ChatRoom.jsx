import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, joinRoom, sendMessage, leaveRoom } from '../../action/chat.js';
import Leftsidebar from '../../Components/Leftsidebar/Leftsidebar.jsx';
import "./ChatRoom.css"; // Import the CSS file

const ChatRoom = ({ slidein }) => {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const chatState = useSelector((state) => state.chat || { roomId: null, messages: [] });
    const { roomId, messages } = chatState;

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5000');
        setSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Message received from server:', data);
            const { userId, content } = data;
            dispatch(sendMessage({ userId, content }));
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, [dispatch]);

    const handleCreateRoom = () => {
        const newRoomId = `room-${Math.random().toString(36).substr(2, 9)}`;
        console.log('Creating room with ID:', newRoomId);

        // Ensure the socket is connected before sending data
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ action: 'create_room', roomId: newRoomId }));

            // Dispatch createRoom action after socket confirmation
            dispatch(createRoom(newRoomId));
        } else {
            console.error('WebSocket is not open. Cannot create room.');
        }
    };

    const handleJoinRoom = (roomId) => {
        console.log('Joining room with ID:', roomId);

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ action: 'join_room', roomId }));
            dispatch(joinRoom(roomId));
        } else {
            console.error('WebSocket is not open. Cannot join room.');
        }
    };

    const handleSendMessage = () => {
        console.log('Sending message:', message);

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ action: 'send_message', roomId, content: message }));
            setMessage('');
        } else {
            console.error('WebSocket is not open. Cannot send message.');
        }
    };

    const handleLeaveRoom = () => {
        console.log('Leaving room with ID:', roomId);

        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ action: 'leave_room', roomId }));
            dispatch(leaveRoom());
        } else {
            console.error('WebSocket is not open. Cannot leave room.');
        }
    };

    return (
        <div className='home-container-1'>
            <Leftsidebar slidein={slidein} />
            <div className="chatroom-container">
                {!roomId && (
                    <div className="chatroom-buttons">
                        <button onClick={handleCreateRoom}>Create Room</button>
                        <button onClick={() => handleJoinRoom(prompt('Enter Room ID'))}>Join Room</button>
                    </div>
                )}

                {roomId && (
                    <div>
                        <h2>Room ID: {roomId}</h2>
                        <div className="chat-history">
                            {messages.map((msg, index) => (
                                <p key={index}><strong>{msg.userId}:</strong> {msg.content}</p>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={handleSendMessage}>Send Message</button>
                        <button onClick={handleLeaveRoom}>Leave Room</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatRoom;
