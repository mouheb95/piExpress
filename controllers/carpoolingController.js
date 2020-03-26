const crypto = require('crypto');
const User = require('../models/user.model');
const Carpoolinig = require('../models/carpooling.model')
const Notification = require('../models/notif.model')


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
  try {
    const docs = await Carpoolinig
      .find({})
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.createOneCarPooling = async function (req, res) {


  try {

    //créer un post 
    const doc = await Carpoolinig.create({ ...req.body })
    //res.status(201).json({ data: doc })


    //******* recherche tt les postes qui 'ils ont  post d'offre */
    if (doc.offre_demand_Carpooling.toString() === "Demand") {
      const docc = await Carpoolinig
        .find()
        .where('offre_demand_Carpooling').equals('Offer')
        .where('trage').equals(doc.trage)
        .lean()
        .exec()
        

      res.status(200).json({ data: docc })

      /** lazem ikoun minimum 3 nafess el condition heka */
      if( docc.length >3)
      {
     

        /* 3al post heda chnab3thou l'kol wa7ed 3mal poste d'offre */
      docc.forEach(element => 
        {
          const notif = {
            subject: "Suggestion",
            content: "someaone have tthe same tragee u always went",
            reciver: element.author
          };
        
          const docNotif = Notification.create({ ...notif })
          res.status(201).json({ data: docNotif })
        }
        
        );

      }

    }

    else{

      return res.status(201).json({ message: "posts public succeffully " }).end()

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