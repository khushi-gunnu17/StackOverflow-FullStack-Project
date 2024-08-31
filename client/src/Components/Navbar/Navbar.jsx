import React, {useCallback, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import bars from '../../Assets/bars-solid.svg'
import logo from '../../Assets/logo.png'
import search from '../../Assets/search-solid.svg'
import Avatar from '../Avatar/Avatar.jsx'
import './Navbar.css' 
import { setcurrentuser } from '../../action/currentuser.js'
import { jwtDecode } from "jwt-decode"



function Navbar({handleslidein}) {

    const User = useSelector((state) => state.currentuserreducer)       // var here 
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handlelogout = useCallback(() => {
        dispatch({type : "LOGOUT"})
        navigate("/")
        dispatch(setcurrentuser(null))
    }, [dispatch, navigate] )

    useEffect(() => {
        const token = User?.token
        
        if (token) {
            const decodetoken = jwtDecode(token)

            // Checks if the token's expiration time (decodetoken.exp) converted to milliseconds (* 1000) is less than the current time (new Date().getTime()). If true, it calls handlelogout().
            
            if (decodetoken.exp * 1000 < new Date().getTime()) {
                handlelogout()
            }
        }

        // this is done so that whenever we refresh the page the user doen't get to ask to login again and again.
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
    }, [User?.token, dispatch, handlelogout])


    return (

        <nav className='main-nav'>

            <div className='navbar'>

                <button className='slide-in-icon' onClick={() => handleslidein()}>
                    <img src={bars} alt='bars' width='15' />
                </button>

                <div className='navbar-1'>

                    <Link to='/' className='nav-item nav-logo'>
                        <img src={logo} alt="logo"/>
                    </Link>
                    
                    {/* res-nav not here also in down below */}
                    <Link to='/' className='nav-item nav-btn res-nav'> 
                        About
                    </Link>

                    <Link to='/' className='nav-item nav-btn res-nav'>
                        Products
                    </Link>

                    <Link to='/' className='nav-item nav-btn res-nav'>
                        For Teams
                    </Link>

                    <form>
                        <input type='text' placeholder='Search....' />
                        <img src={search} alt='search' width='18' className='search-icon' />
                    </form>

                </div>

                <div className='navbar-2'>
                    {User === null ? (
                        <Link to='/Auth' className='nav-item nav-links'>
                            Log In
                        </Link>
                    ):(
                        <>
                            <Avatar backgroundColor="#009dff" px='10px' py='7px' borderRadius='50%' color='white'>

                                <Link to={`/Users/${User?.result?._id}`} style={{color:'white', textDecoration:"none"}}>
                                    {User.result.name.charAt(0).toUpperCase()}
                                </Link>
                                
                            </Avatar>

                            <button className='nav-item nav-links' onClick={handlelogout}>Log Out</button>
                        </>
                    )}
                </div>
                
            </div>
        </nav>
    )
}

export default Navbar