var express = require('express');
var router = express.Router();
const controllers = require('../controllers/insuranceController');


router
.route('/ins')
.post(controllers.addInsurance)
.get(controllers.getAllInsurance)

router
.route('/ins/:id')
.post(controllers.proposeInsPrice)
.get(controllers.getOneInsurance)
.put(controllers.updateInsurance)
.delete(controllers.deleteInsurance)

router
.route('/inscar/:id')
.get(controllers.getInsuranceByCar)

router
.route('/carins/:id')
.get(controllers.getCarpobyIns)

router
.route('/insacc/:id')
.post(controllers.acceptins)

router
.route('/insref/:id')
.post(controllers.refuseins)

router
.route('/totreat')
.get(controllers.getInsurancetotreat)


module.exports = router;