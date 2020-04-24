const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Organisation = require('../models/organisation');
const OrgType = require('../models/orgType');

router.get('/', (req,res,next)=>{
    Organisation.find()
        .populate('orgtypeid', '_id name')
        .exec()
        .then(docs=>{
            res.status(200).json({
                count:docs.length,
                organisations: docs.map(org=>{
                    return {
                        _id:org._id,
                        name: org.name,
                        orgtype : org.orgtypeid,
                        email:org.email,
                        website:org.website,
                        contact:org.contact
                    }
                })
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        })
})

router.get('/:organisationid', (req,res,next)=>{
    Organisation.findById(req.params.organisationid)
        .select('_id name email website contact')
        .populate('orgtypeid', '_id name')
        .exec()
        .then(doc=>{
            res.status(200).json({
                organsation : doc,
                request:{
                    type:'GET',
                    url:"http://localhost:3000/organisations"
                }
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:"Not found such an Organisation",
                error: err
            })
        })
})

// Add new Organisation
router.post('/', (req,res,next)=>{
    OrgType.findById(req.body.orgtypeid)
        .then( orgtype=>{
            const organsation = new Organisation({
                _id:mongoose.Types.ObjectId(),
                orgtypeid : req.body.orgtypeid,
                name: req.body.name,
                email:req.body.email,
                website: req.body.website,
                contact:{
                    address:req.body.contact.address,
                    tel:req.body.contact.tel
                }
            });
            return organsation.save();
        })
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message:"Organisation ["+req.body.name+"] has been succesfully created!",
                createdOrganisation:{
                    _id:result._id,
                    orgtypeid : result.orgtypeid,
                    name:result.name,
                    email:result.email,
                    website:result.website,
                    contact:{
                        address:result.contact.address,
                        tel:result.contact.tel
                    }
                },
                request:{
                    type:'GET',
                    url:"http://localhost:3000/organisations/"+result._id
                }
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:"Unable to add the Organisation",
                error: err
            })
        })
})
module.exports = router; 