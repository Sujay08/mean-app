const express = require('express');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const user = require('../models/user');

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Successfully created user',
                        result: result
                    })
                    .catch(err => {
                            err.json({
                                error: err
                            })
                        });
                })
        });
});

router.post("/login", (res,req,next)=>{
    User.findOne({email: req.body.email}).then(user=>{
        if(!user){
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result=>{
        if(!result){
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        const token = jwt.sign({
            email: user.email, userId: user._id
        }, 
        "YOO_DAWG_THIS_IS_MY_PRIVATE_KEY",
        {
            expiresIn: "1h"
        },
        );
    })
    .catch(err=>{
        return res.status(401).json({
            message: "Auth failed"
        })
    })
})

module.exports = router