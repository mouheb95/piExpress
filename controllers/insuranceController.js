const crypto = require('crypto');
const User = require('../models/user.model');
const Carpooling = require('../models/carpooling.model')
const Notification = require('../models/notif.model')
const Insurance = require('../models/insurance.model')


exports.getOneInsurance = async function (req, res) {
  try {
    const doc = await Insurance
      .findOne({ _id: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).json({ message: "no insurance found " }).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
exports.getInsuranceByCar = async function (req, res) {
  try {
    const doc = await Insurance
      .findOne({ carpooling: req.params.id })
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).json({ message: "no insurance found " }).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
exports.addInsurance = async function (req, res) {


  try {
    const doc = await Insurance.create({ ...req.body })

      res.status(201).json({ data: doc })

  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.getAllInsurance = async function (req, res) {
  try {
    const docs = await Insurance
      .find({})
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.updateInsurance = async function (req, res) {

  try {
    const updatedDoc = await Insurance
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
      return res.status(400).json({ message: "not found " }).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.deleteInsurance = async function (req, res) {
  try {
    const docdel = await Insurance.findOneAndRemove({
      _id: req.params.id
    })

    if (!docdel) {
      return res.status(400).json({ message: "not found " }).end()
    }

    return res.status(200).json({ message: "deleted" })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.getInsurancetotreat = async function (req, res) {
  try {
    const docs = await Insurance
    .find({ insuranceprice : { $exists: false } } )
    .lean()
    .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.proposeInsPrice = async function (req, res) {

  try { 
    
    Insurance.updateOne(
      { _id: req.params.id },
      {
        $set: { "insuranceprice": req.body.price },
      }
   )
      .lean()
      .exec()
    res.status(200).json({ message: "proposed" })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
exports.getCarpobyIns = async function (req, res) {
  try {
    const doc = await Insurance
      .findOne({ _id: req.params.id })
      .lean()
      .exec()
    const docc = await Carpooling
    .findOne({ _id: doc.carpooling })
    .lean()
    .exec()

    if (!docc) {
      return res.status(400).json({ message: "no carpooling found " }).end()
    }

    res.status(200).json({ data: docc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
exports.acceptins = async function (req, res) {

  try { 
    
    Insurance.updateOne(
      { _id: req.params.id },
      {
        $set: { "etat": "accepted" },
      }
   )
      .lean()
      .exec()
    res.status(200).json({ message: "accepted" })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}
exports.refuseins = async function (req, res) {

  try { 
    
    Insurance.updateOne(
      { _id: req.params.id },
      {
        $set: { "etat": "rejected" },
      }
   )
      .lean()
      .exec()
    res.status(200).json({ message: "refused" })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}