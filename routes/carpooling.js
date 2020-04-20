var express = require('express');
var router = express.Router();
const controllers = require('../controllers/carpoolingController');

/* carpooling routes */

router
.route('/car')
.get(controllers.getAllCarPooling)
.post(controllers.createOneCarPooling)

router
.route('/car/:id')
.get(controllers.getOneCarPooling)
.put(controllers.updateOneCarPooling)
.delete(controllers.removeOneCarPooling)

router
.route('/carpoo')
.get(controllers.count)

router
.route('/userCar')
.get(controllers.userCar)


router
.route('/comment/:id')
.get(controllers.getCommentsbyPost)
.post(controllers.createOneComment)
.put(controllers.updateComment)


router
.route('/comment/:id/:idComment')
.delete(controllers.removeComment)

module.exports = router;