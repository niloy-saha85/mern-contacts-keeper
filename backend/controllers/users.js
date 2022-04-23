const Users = require('express').Router();
const UserModel = require('../db/models/user');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

Users.post('/', [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').not().isEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(e => e.msg) });
    }
    const { body } = req;

    const user = await UserModel.findOne({ email: body.email });
    if (user) return res.status(500).send('Email already exists');

    // Create the user
    const salt = await bcrypt.genSalt(10);
    const newUser = await UserModel.create({
      ...body,
      password: await bcrypt.hash(body.password, salt)
    });

    res.status(201).json({ id: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

Users.get('/', (req, res) => {
  res.send('Users post')
});

module.exports = Users;