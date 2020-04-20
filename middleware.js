const User = require('./models/user.models');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.body.token ||
    req.query.token ||
    req.headers.authorization ||
    "bearer "+req.cookies.token ;  ////////////////// mnin yjib fil tokenn
        
    const token = authHeader.split(' ')[1];

    if (token) {
       
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: "inValide token." });
            }

            req.user = user;
            //next();  // Cannot set headers after they are sent to the client

            return res.status(200).json({ success: true, message: "valide token." });


        });
    } else {
        res.status(401).json({ success: false, message: "no token." });
    }
};

module.exports = authenticateJWT;