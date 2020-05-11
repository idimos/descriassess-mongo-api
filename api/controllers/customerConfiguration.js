const mongoose = require('mongoose');

const CustomerConfiguration = require('../models/customerConfiguration');
const Organisation = require('../models/organisation');
const Period = require('../models/period');

//Responses the Configuration based on userid
exports.customerconfiguration_get_userconfig =  (req,res,next)=>{
    CustomerConfiguration.find({
            $and:[
                { useremail:req.params.useremail},
                { active : true}
            ]
        })
        .populate('organisation')
        .populate('period')
        .populate('userid')
        .exec()
        .then(doc=>{
            // res.status(200).json(doc[0]);

            res.status(200).json(
                // count: doc.length > 0 ? doc.length : 0,
                doc.length > 0 ? doc[0] : null
            )
        })
        .catch(err=>{
            res.status(500).json({
                message:"Not found configuration for user "+req.params.useremail,
                error: err
            })
        })
};

exports.customerconfiguration_new_userconfig = (req,res,next)=>{
    CustomerConfiguration.find({email:req.body.email})
        .exec()

    const cc = new CustomerConfiguration({
        _id:mongoose.Types.ObjectId(),
        userid:req.body.userid,
        useremail:req.body.useremail,
        organisation: req.body.organisation
        // period: {}
    });
    cc.save()
        .then(doc=>{
            res.status(201).json({
                data: doc
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:"Customer configuration error.",
                error:err
            })
        });
}

exports.customerconfiguration_delete_userconfig = (req,res,next)=>{
    CustomerConfiguration.remove({_id: req.params.configid})
    .exec()
    .then(result=>{
        res.status(200).json({
            message:"Customer Configuration deleted succesfully.",
            data:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            message:"Unable to delete the Customer Configuration",
            error: err
        })
    })
}

exports.customerconfiguration_update_organisation = (req,res,next)=>{
    // const UpdateFields = {
    //     organisation:req.body.organisationid
    // };
    CustomerConfiguration.update({_id:req.params.configid}, {$set: {organisation:req.body.organisationid}})
        .exec()
        .then(result=>{
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(500).json({
                message:"Unable to Update the Organisation" + organisationid,
                error: err
            })
        })    
}