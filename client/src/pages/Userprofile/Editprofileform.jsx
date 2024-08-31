import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { updateprofile } from "../../action/users.js";
import './Userprofile.css'


function Editprofileform({currentuser, setSwitch}) {

    const [name, setname] = useState(currentuser?.result?.name)
    const [about, setabout] = useState(currentuser?.result?.about)
    const [tags, settags] = useState([])
    const dispatch = useDispatch()


    const handlesubmit = (e) => {
        e.preventDefault()

        if (tags.length === 0) {
            dispatch(updateprofile(currentuser?.result?._id, {name, about, tags: currentuser?.tags}))
        } else {
            dispatch(updateprofile(currentuser?.result?._id, {name, about, tags}))
        }

        setSwitch(false)
    }

    return (

        <div>

            <h1 className="edit-profile-title">Edit Your Profile</h1>
            <h2 className="edit-profile-title-2">Public Information</h2>


            <form className="edit-profile-form" onSubmit={handlesubmit}>
                
                {/* for name */}
                <label htmlFor="name">
                    <h3>Display Name</h3>
                    <input type="text" value={name} onChange={(e) => setname(e.target.value)}/>
                </label>

                {/* for about section */}
                <label htmlFor="about">  
                    <h3>About me</h3>
                    <textarea name="" id="about" cols="30" rows="10" value={about} onChange={(e) => (setabout(e.target.value))} ></textarea>
                </label>

                {/* for tags */}
                <label htmlFor="tags">
                    <h3>Watched Tags</h3>
                    <p>Add tags separated by one space</p>
                    <input 
                        type="text"
                        id="tags"
                        onChange={(e) => settags(e.target.value.split(' '))}
                    />
                </label>

                <br />

                {/* save button */}
                <input type="submit" value="Save Profile" className="user-submit-btn" />
                
                {/* cancel button */}
                <button type="button" className="user-cancel-btn" onClick={() => setSwitch(false)}>
                    Cancel
                </button>

            </form>
        </div>
    )
}

export default Editprofileform