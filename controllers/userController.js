const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');
const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
var refreshTokens = [];

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

exports.create_user = async function (req, res) {
  const { password, confirmPassword } = req.body;

  if (password === confirmPassword) {

    const hashedPassword = getHashedPassword(password);
    req.body.password = hashedPassword;
    if (await User.findOne({ email: req.body.email })) {
      res.status(400).send("user already exist !!")
    } else {
      try {
        const doc = await User.create({ ...req.body })
        res.status(201).json({ data: doc })
      } catch (e) {

        console.error(e)
        res.status(400).end()
      }
    }

  }
}

exports.login = async function (req, res) {

  // Read username and password from request body
  var { email, password } = req.body;
  var hashedPassword = getHashedPassword(password);
  console.log({ email, hashedPassword })
  var user = await User.findOne({ email: email, password: hashedPassword }).lean().exec()
  console.log(req.body)
  if (user) {
    // generate an access token
    const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
    const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);

    refreshTokens.push(refreshToken);
    res.status(200)
      .cookie('token', accessToken, { httpOnly: true })

      .json({
        accessToken,
        refreshToken,
        user
      }).end()
      
  }
  else {
    res.status(203).send('Username or password incorrect').end()
    //res.send('Username or password incorrect');
    console.log("dd");
  }

};

exports.logout = async function (req, res) {
  res.status(200)
    .cookie('token', "expired", { httpOnly: true })
    .end();

}