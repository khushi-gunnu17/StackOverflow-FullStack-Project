import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
    try {

        // Extracts the token from the Authorization header
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verifies and decodes the JWT using the secret key
        let decodedata = jwt.verify(token, process.env.JWT_SECRET)

        // Stores the decoded user ID in the request object
        req.userid = decodedata?.id

        // Calls the next middleware or route handler
        next()

    } catch (error) {
        // Logs any errors that occur during token verification
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }
}

export default auth