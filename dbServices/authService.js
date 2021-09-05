const { User } = require('../dbModels/userModel')
const bcrypt = require('bcrypt')
require('dotenv').config()

const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')

const registration = async (password, email, subscription) => {
  const avatarURL = gravatar.url(email)

  const user = new User({
    password: await bcrypt.hash(password, 10),
    email,
    subscription,
    avatarURL,
  })
  await user.save()
  await login(email, password)
}
async function login(email, password) {
  let user = await User.findOne({
    email,
  })
  const rightPassword = await bcrypt.compare(password, user.password)
  if (rightPassword) {
    const createdAt = new Date()
    const token = jwt.sign(
      { _id: user._id, createdAt },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )
    user.token = token
    user = await User.findOneAndUpdate(
      { email },
      {
        $set: user,
      },
    )
    user = await User.findOne({
      email,
    })
    return user
  }
  return rightPassword
}
const logout = async token => {
  let user = await User.findOneAndUpdate(
    { token },
    {
      $set: { token: null },
    },
  )
  user = await User.findById(user._id)
  return user.token
}
const changeAvatar = async (avatarURL, token) => {
  const user = await User.findOneAndUpdate(
    { token },
    {
      $set: { avatarURL },
    },
  )
  return user.email
}

module.exports = {
  registration,
  login,
  logout,
  changeAvatar,
}
