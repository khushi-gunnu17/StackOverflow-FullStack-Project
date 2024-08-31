import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Askquestion from './pages/Askquestion/Askquestion.jsx'
import Auth from './pages/Auth/Auth.jsx'
import Questions from './pages/Questions/Questions.jsx'
import Displayquestion from './pages/Questions/Displayquestion.jsx'
import Tags from './pages/Tags/Tags.jsx'
import Users from './pages/Users/Users.jsx'
import Userprofile from './pages/Userprofile/Userprofile.jsx'
import ChatRoom from './pages/ChatRoom/ChatRoom.jsx'
import Chatbot from './pages/ChatBot/Chatbot.jsx'

function RoutesAll({slidein, handleslidein}) {
    return (
        <Routes>
           <Route path='/' element={<Home slidein={slidein} handleslidein={handleslidein}/>} /> 
           <Route path='/Askquestion' element={<Askquestion />} /> 
           <Route path='/Auth' element={<Auth />} /> 
           <Route path='/Questions' element={<Questions slidein={slidein} handleslidein={handleslidein}/>} /> 
           <Route path='/Questions/:id' element={<Displayquestion slidein={slidein} handleslidein={handleslidein}/>} /> 
           <Route path='/Tags' element={<Tags slidein={slidein} handleslidein={handleslidein}/>} /> 
           <Route path='/Users' element={<Users slidein={slidein} handleslidein={handleslidein}/>} /> 
           <Route path='/Users/:id' element={<Userprofile slidein={slidein} handleslidein={handleslidein}/>} /> 
           <Route path='/Chatbot' element={<Chatbot slidein={slidein} handleslidein={handleslidein}/>} /> 
           <Route path='/chat' element={<ChatRoom slidein={slidein} handleslidein={handleslidein}/>} /> 
        </Routes>
    )
}

export default RoutesAll