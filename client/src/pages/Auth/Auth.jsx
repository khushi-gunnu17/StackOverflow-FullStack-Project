import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./Auth.css"
import icon from '../../Assets/icon.png'
import Aboutauth from './Aboutauth.jsx'
import { signup, login } from '../../action/auth.js'

function Auth() {

    const [issignup, setIsSignup] = useState(false)
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handlesubmit = (e) => {   
        e.preventDefault();

        if(!email && !password) {
            alert("Enter email and password")
        }

        if(issignup) {

            if(!name) {
                alert("Enter a name to continue.")
            }
            dispatch(signup({name, email, password}, navigate))
            console.log(name, password, email);

        } else {
            dispatch(login({email, password}, navigate))
            console.log(email, password);
        }
    }


    const handleSwitch = () => {
        setIsSignup(!issignup)
        setname("")
        setemail("")
        setpassword("")
    }


    return (

        <section className='auth-section'>

            {issignup && <Aboutauth/>}

            <div className='auth-container-2'>
                
                {/* change here */}
                {!issignup && <img src={icon} alt='icon' className='login-logo' />}     
                
                <form onSubmit={handlesubmit}>

                    {/* Name field in signup */}
                    {issignup && (
                        <label htmlFor='name'>
                            <h4>Display Name</h4>
                            <input type='text' id='name' name='name' value={name} onChange={(e) => {
                                setname(e.target.value)
                            } }/>
                        </label>
                    )}

                    {/* email */}
                    <label htmlFor='email'>
                        <h4>Email</h4>
                        <input type='email' id='email' name='email' value={email} onChange={(e) => {
                            setemail(e.target.value) 
                        }}/>
                    </label>


                    {/* password */}
                    <label htmlFor='password'>

                        <div style={{display : 'flex', justifyContent : "space-between"}}>

                            <h4>Password</h4>

                            {!issignup && (
                                <p style={{ color : "#007ac6", fontSize : "13px"}}>
                                    Forgot Password ?
                                </p>
                            )}

                        </div>


                        <input type='password' name = 'password' id='password' value={password} onChange={(e) => {
                            setpassword(e.target.value)
                        }} />

                    </label>

                    
                    {/* Button */}
                    <button type='submit' className='auth-btn'>
                        {issignup ? "Sign Up" : "Login"}
                    </button>


                    {issignup && (
                        <p style={{color : "#666767", fontSize : "13px"}}>
                            By clicking sign up, you agree to our 
                            <span style={{color : "#007ac6"}}>terms of <br /> service</span>, 
                            <span style={{color : "#007ac6"}}>privacy policy</span> and 
                            <span style={{color : "#007ac6"}}>cookie policy</span>.
                        </p>
                    )}

                        
                </form>
                
                <p>
                    {issignup ? "Already have an account?" : "Don't have an account"}
                    <button type='button' className='handle-switch-btn' onClick={handleSwitch}>
                        {issignup ? "Login" : "Sign Up"}
                    </button>
                </p>

            </div>
        </section>
    )
}

export default Auth