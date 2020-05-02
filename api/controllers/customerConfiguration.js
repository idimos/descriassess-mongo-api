const mongoose = require('mongoose');

const CustomerConfiguration = require('../models/customerConfiguration');
const Organisation = require('../models/organisation');
const Period = require('../models/period');

//Responses the Configuration based on userid
exports.customerconfiguration_get_userconfig =  (req,res,next)=>{
    CustomerConfiguration.find({
            $and:[
                { userid:req.params.userid},
                {active : true}
            ]
        })
        .populate('organisationid')
        .populate('periodid')
        .exec()
        .then(doc=>{
            if(doc.length > 0){
                res.status(200).json({
                    configuration : doc[0]
                })
            } else{
                res.status(404).json({
                    message : "Configuration not found"
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                message:"Not found configuration for user "+req.params.userid,
                error: err
            })
        })
};

exports.customerconfiguration_new_userconfig = (req,res,next)=>{
    Organisation.find({_id:req.body.organisationid})
        .exec()
        .then(docs=>{
            if (docs.length < 1)
                return;
            next;
        })
        .then(org=>{
            Period.find({_id:req.body.periodid})
                .then(p=>{
                    console.log("Period after 2nd "+ p);
                    if (p.length > 0){
                        const cc = new CustomerConfiguration({
                            _id:mongoose.Types.ObjectId(),
                            userid:req.body.userid,
                            organisationid: req.body.organisationid,
                            periodid: req.body.periodid
                        });
                        return cc.save();
                    }
                    return;
                })
                .then(result=>{
                    console.log("After save "+result);
                    res.status(201).json({
                        message:"Configuration added succesfully!",
                        request:{
                            type:'GET',
                            url:"http://localhost:3000/customerconfiguration/"+result.userid
                        }
                    })
                })
                .catch(err=>{
                    res.status(404).json({
                        error:err
                    })
                })
        })
        .catch(err=>{
            res.status(500).json({
                message:"Unable to add new Configuration",
                error: err
            })
        })



    // Organisation.findById(req.body.organisationid)
    //     .then( ()=>{
    //         const organisation = new Organisation({
    //             _id:mongoose.Types.ObjectId(),
    //             orgtypeid : req.body.orgtypeid,
    //             name: req.body.name,
    //             email:req.body.email,
    //             website: req.body.website,
    //             contact:{
    //                 address:req.body.contact.address,
    //                 tel:req.body.contact.tel
    //             }
    //         });
    //         return organsation.save();
    //     })
    //     .then(result=>{
    //         console.log(result);
    //         res.status(201).json({
    //             message:"Organisation ["+req.body.name+"] has been succesfully created!",
    //             createdOrganisation:{
    //                 _id:result._id,
    //                 orgtypeid : result.orgtypeid,
    //                 name:result.name,
    //                 email:result.email,
    //                 website:result.website,
    //                 contact:{
    //                     address:result.contact.address,
    //                     tel:result.contact.tel
    //                 }
    //             },
    //             request:{
    //                 type:'GET',
    //                 url:"http://localhost:3000/organisations/"+result._id
    //             }
    //         })
    //     })
    //     .catch(err=>{
    //         res.status(500).json({
    //             message:"Unable to add the Organisation",
    //             error: err
    //         })
    //     })
}