const mongoose = require('mongoose');

const Organisation = require('../models/organisation');
const CustConfig = require('../models/customerConfiguration');


exports.organisations_get_organisation =  (req,res,next)=>{
    Organisation.find({_id:req.params.organisationid})
        .select('_id name orgtype contact')
        .exec()
        .then(docs=>{
            if (docs.length > 0) res.status(200).json(docs[0])
            else res.status(200).json(null);
        })
        .catch(err=>{
            res.status(500).json({
                message:"Not found such an Organisation",
                error: err
            })
        })
};

exports.organisations_gel_all = (req,res,next)=>{
    Organisation.find()
        .exec()
        .then(docs=>{
            res.status(200).json({
                count:docs.length,
                data: docs.map(org=>{
                    return {
                        _id:org._id,
                        name: org.name,
                        orgtype : org.orgtype,
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
}

exports.organisations_new_organisation = (req,res,next)=>{
    const organsation = new Organisation({
        _id:mongoose.Types.ObjectId(),
        orgtype : req.body.orgtype,
        name: req.body.name,
        contact:{
            address :req.body.contact.address,
            tel     :req.body.contact.tel,
            email   :req.body.contact.email,
            website :req.body.contact.website
        }
    });
    organsation.save()
        .then(result=>{
            console.log("Organisation ["+result+"] created succesfully!!!");
            res.status(201).json({
                message:"Organisation ["+req.body.name+"] has been succesfully created!",
                data:{
                    _id:result._id,
                    orgtype : result.orgtype,
                    name:result.name,
                    contact:{
                        address:result.contact.address,
                        tel:result.contact.tel,
                        email:result.contact.email,
                        website:result.contact.website
                    }
                }
                // request:{
                //     type:'GET',
                //     url:"http://localhost:3000/organisations/"+result._id
                // }
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:"Unable to add the Organisation",
                error: err
            })
        })
}

exports.organisations_delete_organisation = (req,res,next)=>{
    Organisation.remove({_id: req.params.organisationid})
        .exec()
        .then(result=>{
            res.status(200).json({
                message:"Organisation deleted succesfully."
                // data:result
            })
            // return {
            //     message:"Organisation deleted succesfully -",
            //     orgid : req.params.organisationid
            // };
        })
        // .then(data=>{
        //     CustConfig.remove({organisation:data.orgid})
        //         .exec()
        //         .then(res2=>{
        //             res.status(200).json({
        //                 message:data.message+" Configuration deleted succesfully."
        //             })
        //         })
        // })
        .catch(err=>{
            res.status(500).json({
                message:"Unable to delete the Organisation" + organisationid,
                error: err
            })
        })
};

exports.organisations_update_organisation = (req,res,next)=>{
    console.log(req.body);

    // for(const ops of req.body){
    //     UpdateOps[ops.propName] = ops.value;
    // }
    const UpdateFields = {
        name:req.body.name,
        orgtype : req.body.orgtype,
        contact : {
            address : req.body.contact.address,
            tel : req.body.contact.tel,
            email : req.body.contact.email,
            website : req.body.contact.website
        }
    };
    Organisation.update({_id:req.params.organisationid}, {$set: UpdateFields})
        .exec()
        .then(result=>{
            res.status(200).json({
                data:result
            });
        })
        .catch(err=>{
            res.status(500).json({
                message:"Unable to Update the Organisation" + organisationid,
                error: err
            })
        })
}