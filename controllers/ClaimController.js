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

