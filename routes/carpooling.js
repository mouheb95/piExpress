var express = require('express');
var router = express.Router();
const controllers = require('../controllers/carpoolingController');
const Carpoolinig = require('../models/carpooling.model')

const multer = require('multer');


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






const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

  router.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);

    const carpool = new Carpoolinig({
        title: req.body.title,
        parcel:{
            categorie:req.body.categorie,
            photos:req.file.path
        }
    })
    .save()
    .then(res=>{
        console.log(res);
        res.status(201).json()
    })
    
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send(file);
  })

module.exports = router;