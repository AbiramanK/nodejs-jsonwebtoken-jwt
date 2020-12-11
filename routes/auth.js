var express = require('express');
var jwt = require('jsonwebtoken');
var tokenConfig = require('./../utils/token');
var router = express.Router();

router.post('/login', async function (req, res, next) {

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

module.exports = router;