const User = require('../models/user.model');

exports.getOne = async function (req, res){
    try {
      const doc = await User
        .findOne({ _id: req.params.id })
        .lean()
        .exec()
  
      if (!doc) {
        return res.status(400).end()
      }
  
      res.status(200).json({ data: doc })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  exports.getAll = async function (req, res) {
    try {
      const docs = await User
        .find({ })
        .lean()
        .exec()
  
      res.status(200).json({ data: docs })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }

  exports.createOne = async function (req, res) {
    if( await User.findOne({ email: req.body.email})){
        res.status(400).send("user already exist !!")
    } else {
        try {
            const doc = await User.create({ ...req.body })
            res.status(201).json({ data: doc })
          } catch (e) {
            console.error(e)
            res.status(400).end()
          }
    }
    
  }
  
  exports.updateOne = async function (req, res) {
    try {
      const updatedDoc = await User
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
  
  exports.removeOne = async function (req, res) {
    try {
      const removed = await User.findOneAndRemove({
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