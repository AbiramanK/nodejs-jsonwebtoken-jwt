var express = require('express');
var jwt = require('jsonwebtoken');
var tokenConfig = require('./../utils/token');
const {
    celebrate,
    Joi
} = require('celebrate');
var LoginValidationSchema = require('../validationSchema/LoginValidationSchema');
const checkAuth = require('./../middlewares/auth-check');
var router = express.Router();

router.post(
    '/login',
    celebrate(LoginValidationSchema),
    async function (req, res, next) {
        let {
            email,
            password
        } = req.body;

        var token = jwt.sign({
            email,
            password
        },
            tokenConfig.secrets,
            { expiresIn: tokenConfig.expiresIn });

        res.send({
            success: true,
            message: "Logged in successfully",
            token
        });
    });

router.get(
    '/login/check',
    checkAuth,
    function (req, res, next) {
        return res.send({
            success: true,
            message: "Token verified successfully"
        })
    }
)

module.exports = router;