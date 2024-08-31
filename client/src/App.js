import { fetchallusers } from './action/users.js';
import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesAll from './RoutesAll.jsx';
import { useDispatch } from 'react-redux';
import {fetchallquestion} from './action/question.js'

function App() {

  const [slidein, setSlidein] = useState(true)
  const dispatch = useDispatch()
  // useDispatch is a hook provided by the react-redux library. When you call useDispatch, it gives you a reference to the dispatch function from the Redux store.

  // dispatch is like sending a message to your app's central state management system (Redux store).
  // This message tells the store to change something about the state, like adding a new user, fetching data, or updating a value.

  useEffect(() => {
    dispatch(fetchallusers()) // Fetch all users when the component mounts
    dispatch(fetchallquestion())  // Fetch all questions when the component mounts
  }, [dispatch]) // Only run this effect when dispatch changes (which won't happen in this case) 


  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSlidein(false)
    }
  }, [])


  const handleslidein = () => {
    if (window.innerWidth <= 768) {
      setSlidein((state) => !state)
    }
  }


  return (
    <div className="App">
      <Router>
        <Navbar handleslidein = {handleslidein} />
        <RoutesAll slidein={slidein} handleslidein={handleslidein} />
      </Router>
    </div>
  );
}

export default App;

// RoutesAll is rendered with slidein and handleslidein props. slidein controls whether the sidebar is shown or not, and handleslidein is used to toggle the sidebar.