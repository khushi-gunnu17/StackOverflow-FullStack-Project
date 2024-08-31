import express from 'express';
import sendCodeRequestNotification from '../controller/notifications.js';

const router = express.Router();

router.post('/send-code-request-notification', sendCodeRequestNotification);

export default router;
