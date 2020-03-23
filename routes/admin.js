var express = require('express');
var router = express.Router();
const controllers = require('../controllers/adminController');

/* users routes */

router
.route('/users')
.get(controllers.getAllUser)
.post(controllers.createOneUser)

router
.route('/users/:id')
.get(controllers.getOneUser)
.put(controllers.updateOneUser)
.delete(controllers.removeOneUser)


/* carpooling routes */

router
.route('/carpooling')
.get(controllers.getAllCarPooling)
.post(controllers.createOneCarPooling)

router
.route('/carpooling/:id')
.get(controllers.getOneCarPooling)
.put(controllers.updateOneCarPooling)
.delete(controllers.removeOneCarPooling)


module.exports = router;