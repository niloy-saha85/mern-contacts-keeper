const ContactsModel = require('../db/models/contact');
const { Types } = require('mongoose');

const isContactOwner = async (req, res, next) => {
  if (!req.params?.id) return res.status(400).send('Invalid Request');

  const existingContact = await ContactsModel.findOne({
    _id: Types.ObjectId(req.params.id),
    owner: Types.ObjectId(req.auth.id)
  });
  // console.log('contact:', existingContact);
  if (!existingContact) return res.status(403).send('Access Denied');

  req.contact = existingContact;
  return next();
}

module.exports = { isContactOwner };
