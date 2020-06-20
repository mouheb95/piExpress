var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');


/* GET users listing. */
router.post('/register', controller.create_user);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

router.get('/friends', controller.getFriends)


router
.route('/searchAuthorById/:id')
.get(controller.getAuthorById)

module.exports = router;
