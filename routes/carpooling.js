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

router
.route('/notification/:id')
.get(controllers.getNotification)
.delete(controllers.deleteNotif)






const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

  router.put('/file/:id', upload.single('file'), async function (req, res, next) {
    const file = req.file;
    console.log(req.file.path);

    Carpoolinig.findOneAndUpdate({ _id: req.params.id },
      { $set: { 'parcel.photos':req.file.path  } },{new:true}).then((docs)=>{
          if(docs) {
             resolve({success:true,data:docs});
          } else {
             reject({success:false,data:"no such user exist"});
          }
      }).catch((err)=>{
         reject(err);
      });
    
  })




module.exports = router;