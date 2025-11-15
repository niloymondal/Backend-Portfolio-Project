const { decode } = require("jsonwebtoken");
const authConfigs = require("../config/auth.config.js");

const validateUser = (req, res, next) =>{

    const token = req.cookies["user-token"];
    const decoded = authConfigs.decodedToken(token);
    console.log(decoded);

    if(decoded === null){
        return res.status(401).json({
            message : "Invalid Token",
        });
    }else {
    //     req.headers.email = decoded["email"]; // create email field
    // req.headers._id = decoded["id"]; // [] for accessing field
    req.user = {

        email: decoded.email,
        id: decoded.id
    };
    next();
    };

};

module.exports = validateUser;