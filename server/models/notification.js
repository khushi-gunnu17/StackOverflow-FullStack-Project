import mongoose from 'mongoose';

const notificationSchema = mongoose.Schema({
    questionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question', 
        required: true
    },

    requesterId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    posterId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },

    message: {
        type: String, 
        required: true 
    },

    read: {
        type: Boolean, 
        default: false 
    },

    timestamp: {
        type: Date, 
        default: Date.now 
    }
    
});

export default mongoose.model('Notification', notificationSchema);
