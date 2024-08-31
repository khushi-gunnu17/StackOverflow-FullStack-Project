import React from 'react'
import {Link} from 'react-router-dom'
import moment from "moment"
// moment: A library for parsing, validating, manipulating, and formatting dates.

function Question({ question }) {

    return (

        <div className='display-question-container'>

            <div className='display-votes-ans'>
                <p>{question.upvote.length - question.downvote.length}</p>
                <p>votes</p>
            </div>

            <div className='display-votes-ans'>
                <p>{question.noofanswers}</p>
                <p>answers</p>
            </div>


            <div className='display-question-details'>
                
                <Link to={`/Questions/${question._id}`} className='question-title-link'>
                    {question.questiontitle.length > (window.innerWidth <= 400 ? 70 : 90)
                     ? question.questiontitle.substring(
                        0,
                        window.innerWidth <= 400 ? 70 : 90 
                    ) + "..." 
                    : question.questiontitle
                }
                </Link>

                <div className='display-tags-time'>

                    <div className='display-tags'>
                        {
                            question?.questiontags?.map((tag) => (
                                <p key={tag}> {tag} </p>
                            ))
                        }
                    </div>

                    <p className='display-time'>
                        asked {moment(question.askedon).fromNow()} by {question.userposted}
                    </p>

                </div>
            </div>
            
        </div>
    )
}

export default Question

// moment(question.askedon).fromNow() uses the moment library to display the time the question was asked in a human-readable format (e.g., "2 hours ago").

// question.userposted displays the user who posted the question.

// Link is a component from the react-router-dom library. It creates a navigable link in the application without causing a full page reload.