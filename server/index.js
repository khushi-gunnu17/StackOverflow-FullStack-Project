import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userroutes from './routes/user.js';
import questionroutes from "./routes/Question.js";
import answerroutes from "./routes/Answer.js";
import notificationsRoutes from './routes/notifications.js';


const app = express();
dotenv.config();

// Set up middlewares
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes
app.use("/user", userroutes);
app.use("/questions", questionroutes);
app.use("/answers", answerroutes);
app.use('/notifications', notificationsRoutes);

app.get('/', (req, res) => {
    res.send("Codequest is running.");
});


const PORT = process.env.PORT || 5000;
const database_url = process.env.MONGODB_URL;

mongoose.connect(database_url)
    .then(() => server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    }))
    .catch((err) => console.log(err.message));
