const crypto = require('crypto');
const User = require('../models/user.model');
const Claim = require('../models/claim.model')



const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}


// consult your claim
exports.getclaim = async function (req, res) {
  try {
    const doc = await Claim
      .findOne({ _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).json({ message: "the claim pooling is probably deleted " }).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
// get All

exports.getAllClaim = async function (req, res) {
  try {
    const docs = await Claim
      .find({})
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// send claim

exports.sendClaim = async function (req, res) {


  try {

    let rec = new Claim(req.body);
        rec.save(function (err) {
            if (err) {
                return (err);
            }
            res.json(rec);
        })


  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//update claim
exports.updateClaim = async function (req, res) {
  /////// no control for the existance of the user
  try {
    const updatedDoc = await Claim
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

// cancel claim

exports.cancelClaim = async function (req, res) {
  try {
    const removed = await Claim.findOneAndRemove({
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

/*
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

    addComm.comments.push( Comment )
    

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
        {_id: req.params.id }, 
        {$pull: {comments: {_id: req.params.idComment}}},
        function(err, data){
           if(err) return err;
           res.send({data:data});
    });
}*/