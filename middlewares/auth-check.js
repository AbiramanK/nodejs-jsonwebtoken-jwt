const jwt = require('jsonwebtoken');
const tokenConfig = require('./../utils/token')

module.exports = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];

        try {
            let decode = jwt.verify(token, tokenConfig.secrets);

            req.userData = decode;

            next();

        } catch(e) {
            return res.send({
                success: false,
                message: "Invalid token"
            })
        }

    } else {
        return res.send({
            success: false,
            message: "Bearer token not found"
        })
    }
}