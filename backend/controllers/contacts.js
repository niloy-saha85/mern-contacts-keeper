const { body, validationResult } = require('express-validator');
const { authenticate } = require('../middlewares/auth');
const Contacts = require('express').Router();
const ContactsModel = require('../db/models/contact');
const UsersModel = require('../db/models/user');
const { Types, connection } = require('mongoose');
const { isContactOwner } = require('../middlewares/contact');


Contacts.post('/', [
  authenticate,
  body('name').not().isEmpty().withMessage('Contact name is required'),
  body('email').isEmail().withMessage('Email name is required'),
  body('phone').isNumeric().withMessage('Phone is required').bail()
    .isLength({ min: 10, max: 10 }).withMessage('Valid phone is required'),
  body('contact_type').not().isEmpty().withMessage('Contact type is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array().map(e => e.msg) });
    }

    const existingContact = await ContactsModel.findOne({
      email: req.body.email,
      phone: req.body.phone,
      owner: Types.ObjectId(req.auth.id)
    });
    if (existingContact) return res.status(500).send('Contact already exists');

    let newContact;
    const session = await connection.startSession();
    await session.withTransaction(async () => {
      // Saving the contact with user ref
      newContact = await ContactsModel.create([{
        ...req.body,
        owner: req.auth.id
      }], { session });

      console.log(newContact);

      // Saving the user with contact ref
      const owner = await UsersModel.findById(req.auth.id);
      owner.contacts.push(newContact[0]?.id);

      await owner.save({ session });
    });
    session.endSession();
    return res.status(201).json(newContact[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

Contacts.get('/', authenticate, async (req, res) => {
  try {
    const user = await UsersModel.findById(req.auth.id).populate({ path: 'contacts', select: '-owner -updated_at -__v' });
    return res.json(user.contacts || []);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

Contacts.put('/:id', [authenticate, isContactOwner], async (req, res) => {
  try {
    if (req.body.name) req.contact.name = req.body.name;
    if (req.body.phone) req.contact.phone = req.body.phone;
    if (req.body.email) req.contact.email = req.body.email;
    if (req.body.contact_type) req.contact.contact_type = req.body.contact_type;
    await req.contact.save();
    return res.json({ msg: 'Updated' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

/**
 * Update the users contacts refs
 * Delete the contact
 */
Contacts.delete('/:id', [authenticate, isContactOwner], async (req, res) => {
  try {
    const session = await connection.startSession();
    await session.withTransaction(async () => {
      // Update the user
      const user = await UsersModel.findById(req.auth.id).populate('contacts').session(session);
      console.log('User: ', user);
      user.contacts.pull(req.params.id);
      await user.save({session});
      // Delete the contacxt
      await req.contact.delete({session});
    });
    session.endSession();
    return res.json({msg: 'Deleted'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = Contacts;