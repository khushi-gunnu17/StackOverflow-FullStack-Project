import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from 'axios';
import userroutes from './routes/user.js';
import questionroutes from "./routes/Question.js";
import answerroutes from "./routes/Answer.js";
import uploadRoutes from './routes/upload.js';
import notificationsRoutes from './routes/notifications.js';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
dotenv.config();

// Set up middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/user", userroutes);
app.use("/questions", questionroutes);
app.use("/answers", answerroutes);
app.use('/upload-video', uploadRoutes);
app.use('/notifications', notificationsRoutes);

app.get('/', (req, res) => {
    res.send("Codequest is running.");
});

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });

        const botResponse = response.data.choices[0].message.content;
        res.json({ botResponse });

    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        res.status(500).json({ error: 'Failed to get a response from the AI. Please try again later.' });
    }
});


// WebSocket for Temporary Chat Rooms
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const chatRooms = {}; // To store active chat rooms

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        const { action, roomId, userId, content } = data;

        switch (action) {
            case 'create_room':
                chatRooms[roomId] = { users: [ws] };
                ws.roomId = roomId;
                break;

            case 'join_room':
                if (chatRooms[roomId]) {
                    chatRooms[roomId].users.push(ws);
                    ws.roomId = roomId;
                } else {
                    // Sending an error message if the room doesn't exist
                    ws.send(JSON.stringify({ error: 'Room does not exist.' }));
                }
                break;

            case 'send_message':
                if (chatRooms[roomId]) {
                    chatRooms[roomId].users.forEach(user => {
                        user.send(JSON.stringify({ userId, content }));
                    });
                }
                break;

            case 'leave_room':
                if (chatRooms[roomId]) {
                    chatRooms[roomId].users = chatRooms[roomId].users.filter(user => user !== ws);
                    if (chatRooms[roomId].users.length === 0) {
                        delete chatRooms[roomId];
                    }
                }
                break;
        }
    });

    ws.on('close', () => {
        const roomId = ws.roomId;
        if (chatRooms[roomId]) {
            chatRooms[roomId].users = chatRooms[roomId].users.filter(user => user !== ws);
            if (chatRooms[roomId].users.length === 0) {
                delete chatRooms[roomId];
            }
        }
    });
});


const PORT = process.env.PORT || 5000;
const database_url = process.env.MONGODB_URL;

mongoose.connect(database_url)
    .then(() => server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch((err) => console.log(err.message));
