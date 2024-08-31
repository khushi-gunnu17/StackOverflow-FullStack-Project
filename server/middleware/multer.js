import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Set up storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${uuidv4()}${path.extname(file.originalname)}`);
    }
});

// Create multer instance
const upload = multer({ storage });

export default upload;
