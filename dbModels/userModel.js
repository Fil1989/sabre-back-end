const mongoose = require('mongoose')
const { UserDuplicateError } = require('../errorHelpers/errors')

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [
      true,
      () => {
        throw new UserDuplicateError('email dublication')
      },
    ],
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationtoken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  token: String,
})
const User = mongoose.model('User', userSchema)

module.exports = { User }
