const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.users_signin_user = (req,res,next)=>{
    User.find({email: req.body.email})
        .exec()
        .then(user=>{
            if (user.length<1){
                return res.status(401).json({
                    message:"Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"Auth failed"
                    });              
                }
                if (result){
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userid:user[0]._id
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: "12h",
                        }
                    );
                    return res.status(200).json({
                        message:"Auth successful ",
                        token:token
                        // userid:user[0]._id
                    });
                }
                return res.status(401).json({
                    message:"Auth failed"
                });
            })
        })
        .catch(err=>{
            res.status(500).json({
                message: err,
            })
        })
};

exports.users_get_user = (req,res,next)=>{
    User.findById(req.params.userId)
        .select('_id email')
        .exec()
        .then( user=>{
            res.status(200).json({
                message:"Selected user ...",
                user:user
            })
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
}

exports.users_signup_user = (req,res,next)=>{
    User.find({email:req.body.email})
        .exec()
        .then(user=>{
            if( user.length >=1){
                return res.status(409).json({
                    message:"Email address already exists"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            error:err
                        });
                    } else {
                        const user = new User({
                            _id : mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                       })
                       user.save()
                        .then(result=>{
                            res.status(201).json({
                                message:"User created",
                                request:{
                                    type:'GET',
                                    url:"http://localhost:3000/user/"+result._id
                                }
                            })
                        })
                        .catch(err=>{
                            res.status(500).json({
                                error:err
                            })
                        });
                    }
                })
            }
        })
        .catch()
}