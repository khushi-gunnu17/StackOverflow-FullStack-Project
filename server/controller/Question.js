import Question from "../models/Questions.js";
import mongoose from "mongoose"



export const Askquestion = async(req, res) => {

    const postquestiondata = req.body
    const userID = req.userid

    // Creating a new question using the Question model.
    // const postQuestion = await Question.create({
    //     ...postquestiondata, userid
    // })

    // same as the above one

    const postQuestion = new Question(postquestiondata)

    try {
        // saving the question to the database
        await postQuestion.save()
        res.status(200).json("Posted a question successfully.")
        
    } catch (error) {
        console.log(error);
        res.status(404).json("Could not post a new question.")      // 409 here 
        return 
    }

}







export const getallquestion = async(req, res) => {

    try {

        const questionlist = await Question.find().sort({askedon : -1})
        res.status(200).json(questionlist)
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message : error.message})
        return  
    }

}







export const deletequestion = async(req, res) => {

    // Extracts the question ID from the request parameters.
    const { id : _id } = req.params

    // Checking if the ID is valid.
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question unavailable...")
    }

    try {

        await Question.findByIdAndDelete(_id)
        res.status(200).json({message : "Successfully deleted..."})
        
    } catch (error) {
        res.status(404).json({message : error.message})
        return        
    }

}






export const votequestion = async(req, res) => {

    // Extracting the id from the request parameters and assigns it to _id.
    const { id : _id } = req.params

    // Extracting the value and userid from the request body, which indicates if the vote is an "upvote" or "downvote".
    const { value, userid } = req.body


    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Question Unavailable....")
    }

    
    try {

        const question = await Question.findById(_id)


        /* 

        - These lines down below check if the user has already upvoted or downvoted the question.
        - findIndex returns the index of the first element that satisfies the condition. If the user ID is found in the upvote array, upindex will be the index of that element; otherwise, it will be -1.
        - Similarly, downindex checks if the user ID is in the downvote array.
        */

        const upindex = question.upvote.findIndex((id) => id === String(userid))    // Checks if the user has already upvoted this question.
        const downindex = question.downvote.findIndex((id) => id === String(userid))    // Checks if the user has already downvoted this question.

        if (value === "upvote") {

            if (downindex !== -1) {
                question.downvote = question.downvote.filter((id) => id !== String(userid))
            }

            if (upindex === -1) {
                question.upvote.push(userid)
            } else {
                question.upvote = question.upvote.filter((id) => id !== String(userid))
            }

        } else if (value === "downvote") {

            if (upindex !== -1) {
                question.upvote = question.upvote.filter((id) => id !== String(userid))
            }

            if (downindex === -1) {
                question.downvote.push(userid);
            } else {
                question.downvote = question.downvote.filter((id) => id !== String(userid))
            }

        }

        await Question.findByIdAndUpdate(_id, question)
        res.status(200).json({message : "Voted successfully..."})
        
    } catch (error) {
        res.status(404).json({ message: "id not found" });
        return
    }

}


/* 

- Handle Upvote Logic:

> if (value === "upvote"): If the vote is an upvote:
> if (downindex !== -1): If the user has already downvoted the question, remove the downvote.
> if (upindex === -1): If the user hasn't upvoted the question yet, add the upvote.
> else: If the user has already upvoted, remove the upvote (toggle the vote).

- Handle Downvote Logic:

> if (value === "downvote"): If the vote is a downvote:
> if (upindex !== -1): If the user has already upvoted the question, remove the upvote.
> if (downindex === -1): If the user hasn't downvoted the question yet, add the downvote.
> else: If the user has already downvoted, remove the downvote (toggle the vote).

*/






/*

- Handling Upvotes

-- If the user wants to upvote the question (value === "upvote"):
-> Removing Downvote: If the user has already downvoted the question (downindex !== -1), their ID is removed from the downvote array.
-> Toggling Upvote:
> If the user hasn't upvoted yet (upindex === -1), their ID is added to the upvote array.
> If the user has already upvoted (upindex !== -1), their ID is removed from the upvote array (essentially undoing their upvote).



- Handling Downvotes

-- If the user wants to downvote the question (value === "downvote"):
-> Removing Upvote: If the user has already upvoted the question (upindex !== -1), their ID is removed from the upvote array.
-> Toggling Downvote:
> If the user hasn't downvoted yet (downindex === -1), their ID is added to the downvote array.
> If the user has already downvoted (downindex !== -1), their ID is removed from the downvote array (essentially undoing their downvote).


*/