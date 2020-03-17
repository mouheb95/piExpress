var express = require('express');
var router = express.Router();
const controllers = require('../controllers/adminController');

/* GET Ones listing. */

router
.route('/')
.get(controllers.getAll)
.post(controllers.createOne)

// /api/item/:id
router
.route('/:id')
.get(controllers.getOne)
.put(controllers.updateOne)
.delete(controllers.removeOne)

module.exports = router;