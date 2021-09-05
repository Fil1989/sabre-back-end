const { asyncWrapper } = require('../../errorHelpers/apiHelpers')
const express = require('express')
const router = express.Router()
const {
  listContacts,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contactsController')
const {
  validationMiddleware,
} = require('../../middlewares/validationMiddleware')

// Всі контакти
router.get('/', asyncWrapper(listContacts))
// Додати контакт
router.post('/', validationMiddleware, asyncWrapper(addContact))
// Видалення контакту
router.delete('/:contactId', asyncWrapper(removeContact))
// Змінити контакт
router.put('/:contactId', validationMiddleware, asyncWrapper(updateContact))
// Route for changing status

module.exports = router
