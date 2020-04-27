const mongoose = require('mongoose');

const Period = require('../models/period');

exports.periods_get_all = (req,res,next)=>{
    Period.find()
        .select('name active startdate enddate subperiods')
        .exec()
        .then(periods=>{
            res.status(200).json({
                count:periods.length,
                periods:periods
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:"Error on getting Periods",
                error:err
            })
        })
}

exports.periods_new_period = (req,res,next)=>{
    Period.find({name:req.body.name})
        .then( periods=>{
            if(periods.length < 1){

                const subperiods = [];
                for(const p of req.body.subperiods){
                    subperiods.push(p);
                }
                const period = new Period({
                    _id : mongoose.Types.ObjectId(),
                    name: req.body.name,
                    active: req.body.active,
                    startdate: req.body.startdate,
                    enddate: req.body.enddate,
                    subperiods: subperiods,
                    notes:req.body.notes
                });

                period.save()
                    .then(result=>{
                        res.status(201).json({
                            message:"Period ["+req.body.name+"] has been succesfully created!",
                            periodCreated:{
                                _id:result._id,
                                name:result.name,
                                active: result.active,
                                startdate: result.startdate,
                                enddate: result.enddate,
                                subperiods:result.subperiods,
                                notes:result.notes
                            },
                            request:{
                                type:'GET',
                                url:"http://localhost:3000/periods"
                            }
                        })
                    })
                    .catch(err=>{
                        res.status(500).json({
                            message:"Unable to add the Period",
                            error: err
                        })
                    })
            } else {
                return res.status(401).json({
                    message:"A period with the same name already exists."
                })
            }
            
        })
}

exports.periods_add_subperiods = (req,res,next)=>{
    Period.findByIdAndUpdate({_id:req.params.periodid},{$set: { subperiods : req.body}},(err,result)=>{
        if(err){
            res.status(500).json({
                message:"Error on inserting sub periods",
                error:err
            })           
        }
        res.status(200).json({
            message:"SubPeriods updated succesfully!",
            result:result
        })
    });
}

exports.periods_update_period = (req,res,next)=>{
    // const UpdateOps = {};
    // for(const ops of req.body){
    //     UpdateOps[ops.propName] = ops.value;
    // }
    // Organisation.update({_id:req.params.organisationid}, {$set: UpdateOps})
    //     .exec()
    //     .then(result=>{
    //         res.status(200).json(result);
    //     })
    //     .catch(err=>{
    //         res.status(500).json({
    //             message:"Unable to Update the Organisation" + organisationid,
    //             error: err
    //         })
    //     })
}

exports.periods_delete_period = (req,res,next)=>{
    const id = req.body._id;
    Period.findByIdAndRemove({_id:id},(err,result)=>{
        if(err){
            return res.status(500).json({
                message:"Unable to delete the period",
                error:err
            })
        }
        res.status(200).json({
            message:"Period deleted succesfully!",
            result:result
        })
    })
}

exports.periods_delete_subperiod = (req,res,next)=>{
    Period.findOneAndUpdate(
        {_id:req.params.periodid},
        {$pull:{subperiods:{_id:req.params.subperiodid}}},
        function(err, data){
            if(err) return err;
            res.status(200).json({data:data});
        })
}

exports.periods_delete_all_subperiods = (req,res,next)=>{
    Period.update(
        {_id:req.params.periodid},
        {$pull:
            {subperiods: ({})}
        },
        function(err, data){
            if(err) return err;
            res.status(200).json({data:data});
        })
}
