import React from 'react'
import './Leftsidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../Assets/Globe.svg'

const Leftsidebar = ({slidein}) => {

    // slideinstyle moves the sidebar into view by setting translateX to 0%.
    const slideinstyle = {
        transform : "translateX(0%)",
    }

    // slideoutstyle moves the sidebar out of view by setting translateX to -100%.
    const slideoutstyle = {
        transform : "translateX(-100%)",
    }

    return (
        <div className='left-sidebar' style={slidein ? slideinstyle : slideoutstyle}>

            <nav className='side-nav'>

                <button className='nav-btnn'>
                    {/* The activeclassname='active' attribute in the NavLink component is used to apply a specific CSS class to the link when it is active.  */}
                    <NavLink to='/' className="side-nav-links" activeclassname='active'>
                        {/* activeClass = 'active' ??? */}
                        <p>Home</p>
                    </NavLink>
                </button>


                <div className='side-nav-div'>

                    <div>
                        <p>Public</p>
                    </div>
                    
                    {/* Questions Button */}
                    <button className='nav-btnn'>
                        <NavLink to='/Questions' className='side-nav-links' activeclassname='active'>
                            <img src={Globe} alt='globe' />
                            <p style={{paddingLeft : '10px'}}>Questions</p>
                        </NavLink>
                    </button>
                    

                    {/* Tags Button */}
                    <button className='nav-btnn'>
                        <NavLink to='/Tags' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                            <p>Tags</p>
                        </NavLink>
                    </button>
                    

                    {/* Users Button */}
                    <button className='nav-btnn'>
                        <NavLink to='/Users' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                            <p>Users</p>
                        </NavLink>
                    </button>

                </div>
                
            </nav>
        </div>
    )
}

export default Leftsidebar