import mongoose from "mongoose"

const QuestionSchema = mongoose.Schema({

    questiontitle : {
        type : String,
        required : "Question must have a title."
    },

    questionbody : {
        type : String,
        required : "Question must have a body."
    },

    questiontags : {
        type : [String],
        required : "Question must have tags."
    },

    noofanswers : {
        type : [String],
        default : 0
    },

    upvote : {
        type : [String],
        default : []
    },

    downvote : {
        type : [String],
        default : []
    },

    userposted : {
        type : String,
        required : "Question must have an author."
    },

    userid : {
        type : String,
        required : true
    },

    askedon : {
        type : Date,
        default : Date.now
    },

    answer : [
        {
            answerbody : String,
            useranswered : String,
            userid : String,
            answeredon : {
                type : Date,
                default : Date.now
            }
        }
    ],

    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video',
            required : false
        }
    ],

})


export default mongoose.model("Question", QuestionSchema)