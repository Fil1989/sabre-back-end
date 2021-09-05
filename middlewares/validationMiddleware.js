const Joi = require('joi')

const validationMiddleware = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    surname: Joi.string().min(3).max(40).required(),
    phone: Joi.string().min(8).max(14).required(),
    address: Joi.string().required().min(8).max(60),
  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    await res.status(400).json({ message: validationResult.error.message })
    return
  }
  next()
}

module.exports = {
  validationMiddleware,
}
