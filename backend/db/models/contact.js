const { Schema, model } = require('mongoose');

const ContactSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  contact_type: {
    type: String,
    required: true,
    enum: ['Personal', 'Professional'],
    default: 'Personal'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = model('Contact', ContactSchema);
