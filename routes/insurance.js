var express = require('express');
var router = express.Router();
const controllers = require('../controllers/insuranceController');
const controllers1 = require('../controllers/appointmentController');


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

router
.route('/appoint/:id')
.post(controllers1.addAppointment)
.get(controllers1.getAppointments)

router
.route('/oneappoint/:idap/:idus')
.get(controllers1.getOneppointment)
.post(controllers1.validercode)

router
.route('/suponeappoint/:id/:idap')
.delete(controllers1.suppappointment)
.put(controllers1.updateAppointment)

router
.route('/allapp/:idus')
.get(controllers1.getallappointments)

router
.route('/sendsms')
.get(controllers1.sendsms)

module.exports = router;