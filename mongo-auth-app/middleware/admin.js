require('dotenv').config();
const jwt = require("jsonwebtoken");


// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB.
    //  Check readme for the exact headers to be expected
    const token = req.headers.authorization; // bearer token

    const words = token.split(" ")  // ["bearer", "token"]
    const jwtToken = words[1];  // token
    try{
        const decodedValue = jwt.verify(jwtToken, process.env.JWT_SECRET);

        if(decodedValue.username) {
            next();
        } else {
            res.status(403).json({
                message: "You are not authenticated"
            })
        }
    } catch(e){
        res.json({
            message: "Incorrect Inputs"
        })
    }

}

module.exports = adminMiddleware