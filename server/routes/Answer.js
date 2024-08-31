import express from "express"
import {postanswer, deleteanswer}  from "../controller/Answer.js"

import auth from "../middleware/auth.js"


const router = express.Router()

router.patch('/post/:id', auth, postanswer)
// we are not deleting a complete record from the database, hence, we are using patch here instead of delete.
router.patch('/delete/:id', auth, deleteanswer)


export default router