import express from 'express';
import upload from '../middleware/multer.js';
import convertVideo from '../services/ffmpegService.js';
import fs from 'fs';
import Video from '../models/Video.js';

const router = express.Router();

router.post('/', upload.single('file'), async (req, res) => {
    console.log(req.file); // Check if file is uploaded

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const answerId = uuidv4();
    const videoPath = req.file.path;
    const outputPath = `./uploads/answers/${answerId}`;
    const videoUrl = `http://localhost:5000/uploads/answers/${answerId}`;
    const userId = req.body.userId;

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    const result = await convertVideo(videoPath, outputPath, videoUrl);


    if (result.success) {

        // Save video details in the database
        const video = new Video({
            videoUrl: `${videoUrl}/144p/playlist.m3u8`,
            uploadedBy: userId, // Set the user who uploaded the video
            associatedQuestion: req.body.questionId, // Set the associated question if applicable
            description: req.body.description // Optional description
        });

        try {

            await video.save();
            res.json({
                message: "Video converted to HLS format and saved.",
                videoUrl: `${videoUrl}/144p/playlist.m3u8`,
                answerId
            });
            
        } catch (error) {
            res.status(500).json({ error: "Failed to save video details." });
        }

    } else {
        res.status(500).json({ error: "Failed to convert video." });
    }
});

export default router;
