const mongoose = require('mongoose')

const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  surname: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
})
const Contact = mongoose.model('Connection', contactsSchema)

module.exports = { Contact }
