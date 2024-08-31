import Notification from "../models/notification.js"

const sendCodeRequestNotification = async (req, res) => {
    const { questionId, requesterId, posterId, message } = req.body;

    console.log('Request received with data:', req.body);

    try {
        const newNotification = new Notification({
            questionId,
            requesterId,
            posterId,
            message,
        });

        await newNotification.save();

        res.status(201).json({ message: 'Notification sent successfully.' });
    } catch (error) {
        console.error('Error saving notification:', error);
        res.status(500).json({ error: 'Failed to send notification.' });
    }
};


export default sendCodeRequestNotification