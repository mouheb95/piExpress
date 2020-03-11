var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');

/* GET users listing. */
router.post('/register', controller.create_user);
router.post('/login', controller.login);

module.exports = router;
