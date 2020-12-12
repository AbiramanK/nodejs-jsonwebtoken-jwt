const { 
    celebrate, 
    Joi 
} = require('celebrate');

module.exports = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    }
}