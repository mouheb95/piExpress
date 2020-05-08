const crypto = require('crypto');
const User = require('../models/user.model');
const Carpoolinig = require('../models/carpooling.model')
const Notification = require('../models/notif.model')
var express = require('express');
var router = express.Router();
const multer = require('multer');





const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}


exports.getOneCarPooling = async function (req, res) {
  try {
    const doc = await Carpoolinig
      .findOne({ _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).json({ message: "the car pooling is probably deleted " }).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.getAllCarPooling = async function (req, res) {
  Carpoolinig.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
}



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
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
  res.send(file);
})
exports.createOneCarPooling = async function (req, res) {


  try {

    //créer un post 

    /*  if (req.body.from) carpool.trage.from = req.body.from;
     
     if (req.body.to) carpool.trage.to = req.body.to;
     carpool.title = req.body.title;
     carpool.daily = req.body.daily;
     carpool.date = req.body.date;
     carpool.price = req.body.price;
     carpool.people_parcel_Carpooling = req.body.people_parcel_Carpooling;
     carpool.offre_demand_Carpooling = req.body.offre_demand_Carpooling;
     carpool.etat = req.body.etat; */
    //carpool.author.email = req.body.author.email;
    const doc = await Carpoolinig.create({ ...req.body })
    //const doc = await Carpoolinig(carpool).save();
    //console.log(doc)
    //res.status(201).json({ data: doc })


    //******* recherche tt les postes qui 'ils ont  post d'offre */
    if (doc.offre_demand_Carpooling.toString() === "Demand") {
      const docc = await Carpoolinig
        .find()
        .where('offre_demand_Carpooling').equals('Offer')
        .where('trage').equals(doc.trage)
        .lean()
        .exec()


      res.status(200).json({ data: doc._id })

      /** lazem ikoun minimum 3 nafess el condition heka */
      if (docc.length > 0) {



        /* 3al post heda chnab3thou l'kol wa7ed 3mal poste d'offre */
        docc.forEach(element => {
          const notif = new Notification({
            subject: "Suggestion",
            content: doc.author.email + " had same trage u post",
            reciver: element.author,
            sender: doc.author,
            post: doc
          })
            .save()
            .then(res => {
              console.log(res);
              res.status(201).json()
            });
        }
        );
      }
    }

    else {

      return res.status(201).json({data: doc}).end()

    }




  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.updateOneCarPooling = async function (req, res) {
  /////// no control for the existance of the user
  try {
    const updatedDoc = await Carpoolinig
      .findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.removeOneCarPooling = async function (req, res) {
  try {
    const removed = await Carpoolinig.findOneAndRemove({
      _id: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


exports.count = async function (req, res) {

  Carpoolinig.count({ offre_demand_Carpooling: "Offer" }, function (err, result) {
    if (err) {
      console.log(result);
    } else {
      res.json("Number of documents with offer in the collection: " + result);
    }

    if (result > 0) {
      console.log(result);
    }
  });


}

exports.userCar = async function (req, res) {
  try {
    const doc = await Carpoolinig
      .find()
      .where('offre_demand_Carpooling').equals('Offer')
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).json({ message: "the car pooling is probably deleted " }).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}




exports.createOneComment = async function (req, res) {
  const addComment = await Carpoolinig
    .findOneAndUpdate(
      {
        _id: req.params.id
      },
      req.body,
      { new: true }
    )
    .lean()
    .exec()
  if (!addComment) {
    return res.status(400).end()
  }

  res.status(200).json({ data: addComment })

  console.log(req.body)
}

exports.getCommentsbyPost = async function (req, res) {
  try {
    const doc = await Carpoolinig
      .findOne({ _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).json({ message: "the car pooling is probably deleted " }).end()
    }

    res.status(200).json({ data: doc.comments })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


exports.updateComment = async function (req, res) {
  /////// no control for the existance of the user
  try {

    const addComm = await Carpoolinig
      .findOne({ _id: req.params.id })

    const Comment = {
      description: req.body.description,
      author: req.body.author
    };

    addComm.comments.push(Comment)


    // updatedComm.comments.push({...req.body});

    addComm.save(function (err) {
      if (err) return handleError(err)
      console.log('Success!');
    })

    if (!addComm) {
      return res.status(400).end()
    }

    res.status(200).json({ data: addComm })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


exports.removeComment = async function (req, res) {

  // controle saisie

  Carpoolinig.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { comments: { _id: req.params.idComment } } },
    function (err, data) {
      if (err) return err;
      res.send({ data: data });
    });
}


exports.getNotification = async function (req, res) {
  try {
    const doc = await Notification
      .find({'reciver._id':  req.params.id })
      .lean()
      .exec()

      console.log("reciver")

    if (!doc) {
      return res.status(400).json({ message: "the car pooling is probably deleted " }).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}


exports.deleteNotif = async function (req, res) {
  try {
    const removed = await Notification.findOneAndRemove({
      _id: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}