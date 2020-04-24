const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const OrgType = require('../models/orgType');

router.get('/', (req,res,next)=>{
    OrgType.find()
        .select('name _id')
        .exec()
        .then(docs=>{
            res.status(200).json({
                count:docs.length,
                orgtypes:docs.map(doc=>{
                    return {
                        _id: doc._id,
                        name : doc.name
                    }
                })
            });
        })
        .catch(err=>{
            res.status(404).json({
                message:"Error in getting all Organisation Types",
                error : err
            })
        })
});

router.get('/:typeid', (req,res,next)=>{
    const id = req.params.typeid;
    OrgType.findById(id)
        .exec()
        .then(doc=>{
            console.log(doc);
            if (doc)
                res.status(200).json(doc);
            else
                res.status(404).json({
                    message: "No valid entry found"
                })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        })
})

router.post('/', (req,res,next)=>{
    const orgType = new OrgType({
        _id : new mongoose.Types.ObjectId(), 
        name : req.body.name
    }) 
    orgType
        .save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message: " Handling POST req for OrgType",
                newOrgType:orgType
            });
        })
        .catch(err=>{ 
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});
module.exports = router; 