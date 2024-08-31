import React from 'react'
import './Rightsidebar.css'
import Widget from './Widget.jsx'
import Widgettag from './Widgettag.jsx'

function Rightsidebar() {
    return (
        <aside className='right-sidebar'>
            <Widget />
            <Widgettag />
        </aside>
    )
}

export default Rightsidebar