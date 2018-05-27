const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /login'
    });
});

router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = {
            email: req.body.email,
            password: hash
          }
          res.status(201).json({
            message: 'Handling POST requests to /products',
            user: user
          });
          
        }
         
    })
   
});

router.post("/auth", (req, res, next) => {
    if (req.body.email === 'admin' && req.body.password === 'admin') {
        const token = jwt.sign(
            {
              email:'admin',
              userId: 'admin'
            },
            'secretKey',
            {
                expiresIn: "1h"
            }
          );
        res.status(200).json({
            message: 'Login Successful',
            token:token
        });
    } else {
        res.status(200).json({
            message: 'Login failed'
        });
    }

});

module.exports = router;