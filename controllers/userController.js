const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
var refreshTokens = [];

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

exports.create_user = async function (req, res) {
    const { email, firstName, lastName, password, confirmPassword } = req.body;
      // Check if the password and confirm password fields match
  if (password === confirmPassword) {

    // Check if user with the same email is also registered
    

    if ( 
        await User.findOne({ email: email })
      .lean()
      .exec()
     ) {
        res.status(203).send('User already registered.').end()
        //res.send('User already registered.');
        
    } else {

        const hashedPassword = getHashedPassword(password);
        let user = new User(
            {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashedPassword,
                role: req.body.role,
            }
        );
        user.save(function (err) {
            if (err) {
                // @ts-ignore
                return next(err);
            }
            res.status(200).end()
        })
    }

    } else {
        res.status(203).end()
        //res.send('psw mismatch.');
    }
};

exports.login = async function (req, res){
    // Read username and password from request body
    var { email, password } = req.body;
    var hashedPassword = getHashedPassword(password);
    var user = await User.findOne({ email: email, password: hashedPassword}).lean().exec()
    if ( user ) {

      // generate an access token
      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
      const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

      refreshTokens.push(refreshToken);


      
      res.status(200).cookie('token', accessToken, { httpOnly: true }).json({
          accessToken,
          refreshToken
      }).end();
    //res.status(200).end()
      
      
  } else {
    res.status(203).send('Username or password incorrect').end()
      //res.send('Username or password incorrect');
  }
};


