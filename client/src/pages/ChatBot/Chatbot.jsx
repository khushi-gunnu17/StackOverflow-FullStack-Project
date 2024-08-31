import React, { useState } from 'react';
import axios from 'axios';
import "./Chatbot.css"
import Leftsidebar from '../../Components/Leftsidebar/Leftsidebar';

const Chatbot = ({slidein}) => {
    const [otp, setOtp] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Implement your OTP verification logic here.
        if (otp === '1234') { // Replace with your OTP logic
            setIsAuthenticated(true);
        } else {
            alert('Invalid OTP');
        }
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            try {
                const response = await axios.post('http://localhost:5000/api/chat', {
                    message,
                });
    
                const botResponse = response.data.botResponse;
                setChatHistory([...chatHistory, { user: message, bot: botResponse }]);
                setMessage('');
            } catch (error) {
                console.error('Error communicating with the backend:', error);
                alert('Failed to get a response from the AI. Please try again later.');
            }
        }
    };


    return (

        <div className='home-container-1'>

            <Leftsidebar slidein={slidein} />

            <div className="chatbot-container">

                {!isAuthenticated ? (
                    <form onSubmit={handleOtpSubmit}>
                        <h2>Enter OTP to authenticate</h2>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                        />
                        <button type="submit">Verify OTP</button>

                        <h5>1234 is the valid otp.</h5>
                    </form>
                ) : (
                    
                    <div className="chat-interface">

                        <h2>Ask AI</h2>

                        <div className="chat-history">
                            {chatHistory.map((chat, index) => (
                                <div key={index}>
                                    <p><strong>You:</strong> {chat.user}</p>
                                    <p><strong>AI:</strong> {chat.bot}</p>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleChatSubmit}>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your question..."
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                )}
            </div>

        </div>
        
    );
}

export default Chatbot;
