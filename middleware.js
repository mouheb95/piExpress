const jwt = require('jsonwebtoken');
//const accessTokenSecret = 'youraccesstokensecret';

const authenticateJWT = (req, res, next) => {
    const authHeader =     
                    req.body.token ||
                    req.query.token ||
                    req.headers.authorization ||
                    req.cookies.token;

  
    if (authHeader) {
        const token = authHeader.split('.')[0];
        if (token !== "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9") {
            return res.sendStatus(403);
        }
        res.sendStatus(200)
        req.user = user;
        next();

    } else {
        res.sendStatus(401).send('Unauthorized: No token provided');
    }
  };
  

module.exports = authenticateJWT;


/*    if (authHeader) {
        const token = authHeader.split('.')[1];
        console.log(token)
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            res.sendStatus(200)
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401).send('Unauthorized: No token provided');
    }
  };
  */