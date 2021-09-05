const {
  GoIt26NodeError,
  ContactNotFound,
  WrongPathError,
  UserDuplicateError,
} = require('./errors')

const asyncWrapper = controller => {
  return (req, res, next) => {
    controller(req, res).catch(next)
  }
}

const errorHandler = (error, req, res, next) => {
  if (error instanceof ContactNotFound) {
    return res.status(error.status).json({ message: 'No contact with this id' })
  }
  if (error instanceof GoIt26NodeError) {
    return res.status(error.status).json({ message: error.message })
  }
  if (error instanceof WrongPathError) {
    return res.status(error.status).json({ message: error.message })
  }
  if (error instanceof UserDuplicateError) {
    return res.status(error.status).json({ message: error.message })
  }

  res.status(500).json({ message: error.message })
}

module.exports = {
  asyncWrapper,
  errorHandler,
}
