const { Contact } = require('../dbModels/contactModel')

const listContacts = async (req, res) => {
  const contacts = await Contact.find()
  await res.status(200).json(contacts)
}

async function getContactById(req, res) {
  const contactId = req.params.contactId
  const contact = await Contact.findOne({ _id: contactId })
  await res.status(200).json(contact)
}

async function addContact(req, res) {
  const contact = new Contact({ ...req.body })
  await contact.save()
  await res.status(201).json(contact)
}

async function removeContact(req, res) {
  const contactToRemove = await Contact.findOneAndDelete({
    _id: req.params.contactId,
  })
  if (!contactToRemove) {
    await res.status(400).json({ message: "User don't have this contact" })
    return
  }
  await res.status(200).json({ message: 'contact deleted' })
}
const updateContact = async (req, res) => {
  let updatedContact = await Contact.findOneAndUpdate(
    { _id: req.params.contactId },
    {
      $set: { ...req.body },
    },
  )
  if (!updatedContact) {
    await res.status(400).json({ message: 'Contact not found' })
    return
  }
  updatedContact = await getContactById(req, res)

  await res.status(200).json(updatedContact)
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  updateContact,
}
