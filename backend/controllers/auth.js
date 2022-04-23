const Auth = require('express').Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const UserModel = require('../db/models/user');
const { authenticate } = require('../middlewares/auth');

Auth.post('/', [
  body('email').isEmail().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(e => e.msg) });
    }
    const { body } = req;
    const user = await UserModel.findOne({ email: body.email });
    if (!user) return res.status(500).send('Email does not exists'); // return error if email not found
    if (!await bcrypt.compare(body.password, user.password)) return res.status(500).send('Email or Password is invalid');

    return res.json({
      token: sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' })
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

Auth.get('/', authenticate, (req, res) => {
  res.json(req.auth);
});

module.exports = Auth;
