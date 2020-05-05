const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';
var refreshTokens = [];

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

exports.create_user = async function (req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: 'true',
    port: '465',
    auth: {
      user: 'rayen.bensaad@esprit.tn', // must be Gmail
      pass: '183JMT3401'
    }
  });
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

        var mailOptions = {
          from: 'rayen.bensaad@esprit.tn',
          to: 'rayenbensaad01@gmail.com', // must be Gmail
          cc:`${req.body.firstname} <${req.body.email}>`,
          subject: 'Sending Email using Node.js',
          html: `
                  <table style="width: 100%; border: none">
                    <thead>
                      <tr style="background-color: #000; color: #fff;">
                        <th style="padding: 10px 0">Name</th>
                        <th style="padding: 10px 0">E-mail</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th style="text-align: center">${req.body.firstname}</th>
                        <td style="text-align: center">${req.body.email}</td>
                      </tr>
                    </tbody>
                  </table>
                `
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({
              message: 'successfuly sent!'
            })
          }
        });
        
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






exports.getAuthorById = async function (req, res) {

  try {
    const author = await User
      .findById(req.params.id)
      .lean()
      .exec()

    if (!author) {
      return res.status(400).end()
    }

    res.status(200).json({ data: author })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}