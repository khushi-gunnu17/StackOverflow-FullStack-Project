import users from '../models/auth.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async(req, res) => {
    const {name, email, password} = req.body

    try {

        const existinguser = await users.findOne({email})
        
        if (existinguser) {
            return res.status(404)
            .json({
                message : "User already exist"
            })
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 12)


        // Creating a new user in the database
        const newUser = await users.create({
            name, 
            email,
            password : hashedPassword
        })

        
        // Generating a JWT token for the newly created user
        const token = jwt.sign({
            email : newUser.email, 
            id : newUser._id
        }, 
        process.env.JWT_SECRET, {expiresIn : "1h"} )


        // Sends response with newly created user data and JWT token
        res.status(200).json({
            result : newUser,
            token 
        })

    } catch (err) {
        res.status(500).json("Something went wrong...")
        return
    }
}




export const login = async(req, res) => {
    const {email, password} = req.body

    try {

        const existinguser = await users.findOne({email})

        if (!existinguser) {
            return res.status(404)
            .json({
                message : "User does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, existinguser.password)

        if (!isPasswordCorrect) {
            return res.status(400)
            .json({
                message : 'Invalid credentials'
            })
        }

        // Generating a JWT token for the logged-in user
        const token = jwt.sign({
            email : existinguser.email, 
            id : existinguser._id
        }, 
        process.env.JWT_SECRET, {expiresIn : "1h"} )


        // Send response with existing user data and JWT token
        res.status(200).json({result : existinguser, token})

    } catch (error) {
        res.status(500).json("Something went wrong...")
        return
    }
}