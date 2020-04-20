const crypto = require('crypto');
const User = require('../models/user.models');
const Carpoolinig = require('../models/carpooling.model')

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}

exports.getOneUser = async function (req, res) {
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

exports.getAllUser = async function (req, res) {
  try {
    const docs = await User
      .find({})
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

exports.createOneUser = async function (req, res) {
  const { password, confirmPassword } = req.body;

  if (password === confirmPassword) {

    const hashedPassword = getHashedPassword(password);
    req.body.password = hashedPassword;
    if (await User.findOne({ email: req.body.email })) {
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
}

exports.updateOneUser = async function (req, res) {
  const hashedPassword = getHashedPassword(req.body.password);
  req.body.password = hashedPassword;
  console.log(req.body);
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

exports.removeOneUser = async function (req, res) {
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
    const doc = await Carpoolinig.create({ ...req.body })
    res.status(201).json({ data: doc })
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

