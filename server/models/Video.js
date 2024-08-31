import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({

    videoUrl : {
        type : String,
        required : true
    },

    uploadedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },

    associatedQuestion : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Question',
        required : false
    },

    uploadDate : {
        type : Date,
        default : Date.now
    },

    description: {
        type : String,
        required : false
    },

})

export default mongoose.model('Video', videoSchema);