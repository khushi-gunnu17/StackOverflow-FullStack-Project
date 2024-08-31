import React from 'react'
import './Homemainbar.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Questionlist from './Questionlist.jsx'

function Homemainbar() {

    const user = useSelector((state) => state.currentuserreducer)
    const questionlist = useSelector((state) => state.questionreducer)
    const location = useLocation()
    const navigate = useNavigate()

    const checkauth = () => {
        if (user === null) {
            alert("Login or signup to ask a question.")
            navigate("/Auth")
        } else {
            navigate("/Askquestion")
        }
    }

    return (
        <div className='main-bar'>

            <div className='main-bar-header'>

                {location.pathname === '/' ? (
                    <h1>Top Questions</h1>
                ) : (
                    <h1>All Questions</h1>
                )}

                {/* <Link to='/Askquestion' className='ask-btn' >Ask Questions</Link> */}
                <button className='ask-btn' onClick={checkauth}>Ask Questions</button>

            </div>

            <div>
                
                {   
                    questionlist.data === null ? (
                        <h1>Loading...</h1>
                    ) : (
                        <>
                            {/* no data here  */}
                            <p>{questionlist.data.length} questions</p>

                            <Questionlist questionlist={questionlist}/>
                            {/* no data here after questionlist */}
                        </>
                    )
                }
            </div>

        </div>
    )
}

export default Homemainbar