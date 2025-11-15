const jwt = require("jsonwebtoken");

const encodedToken = (email, id) => {

    console.log(email, id);
    const payload = {email, id};
    const key = process.env.JWT_KEY;
    const expire = process.env.JWT_EXPIRE_IN;
    if (!key || !expire) {
    throw new Error("JWT_KEY or JWT_EXPIRE_IN not set in environment variables.");
}
    return jwt.sign(payload, key, {expiresIn: expire});
    // node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" - generate random key
};

const decodedToken = (token) => {
try {
     const key = process.env.JWT_KEY;
     const decoded = jwt.verify(token, key);
     return decoded;
} catch (error) {
    console.error("Error decoding token:", error);
    return null;
}
};

const authConfigs = {encodedToken, decodedToken};

module.exports = authConfigs;