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


module.exports = router;