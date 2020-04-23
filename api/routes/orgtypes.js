const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const OrgType = require('../models/orgtype');

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: " Handling GET req for OrgType"
    });
});

router.post('/', (req,res,next)=>{
    const orgtype = new OrgType({
        _id : new mongoose.Types.ObjectId(), 
        name : req.body.name
    }) ;
    orgtype
        .save()
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{ console.log(err) });

    res.status(201).json({
        message: " Handling POST req for OrgType",
        newOrgType:orgtype
    });
});
module.exports = router; 