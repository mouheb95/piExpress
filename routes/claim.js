var express = require('express');
var router = express.Router();
const controller = require('../controllers/ClaimController');

//crud
router.post('/send', controller.sendClaim);
router.get('/get', controller.getAllClaim);
router.get('/find', controller.findEtat);
router.get('/accept/:id', controller.accept);
router.get('/refuse/:id', controller.refu);


router
.route('/get/:id')
.get(controller.getclaim)
.put(controller.updateClaim)
.delete(controller.cancelClaim)


module.exports = router;
