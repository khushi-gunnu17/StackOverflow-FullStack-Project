import express from "express"
import { login, signup } from "../controller/auth.js"
import { getallusers, updateprofile } from "../controller/users.js"
import auth from "../middleware/auth.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.get("/getallusers", getallusers)
router.patch("/update/:id", updateprofile)

export default router