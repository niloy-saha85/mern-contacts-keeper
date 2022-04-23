const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    email: true
  },
  password: {
    type: String,
    required: true
  },
  contacts: [{
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = model('User', UserSchema);
