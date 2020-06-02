const mongoose = require('mongoose');
var moment = require('moment'); 

const Period = require('../models/period');
const SubPeriod = require('../models/period');

exports.periods_get_period = (req,res,next)=>{
    Period.find({
            $and:[
                {_id:req.params.periodid},
                {active:true}
            ]
        })
        .exec()
        .then(periods=>{
            res.status(200).json(periods[0])
        })
        .catch(err=>{
            res.status(500).json({
                message:"Can\'t find that period"
            })
        })
}

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
    var startdate = new Date(req.body.startdate);
    var enddate = new Date(req.body.enddate);
    daysbetween = Math.ceil((enddate-startdate+1)/86400000); 
    // console.log(Math.ceil((enddate-startdate+1)/86400000).toString());
    startdate.setDate(startdate.getDate()+1);
    enddate.setDate(enddate.getDate()+1);
    numOfSubPeriods = req.body.numofsubperiods;

    var period = new Period({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        active: req.body.active,
        startdate: startdate,
        enddate: enddate,
        notes:req.body.notes
    })

    let step = Math.floor(daysbetween/numOfSubPeriods);

    for(i=1; i<=numOfSubPeriods; i++){
        var d1 = moment(startdate);
        if (i == numOfSubPeriods)
            var d2 = d1.clone().add(step+1,'day');
        else
            var d2 = d1.clone().add(step,'day');
        period.subperiods.push({
            name:"Subperiod "+i.toString(),
            startdate: d1,
            enddate: d2.add(-1,'day'),
            notes:"Subperiod "+i.toString()+" notes"
        });   
        startdate = moment(startdate).add(step,'day');
    }

    period.save()
        .then(result=>{

            res.status(201).json({
                message:"Period ["+result.name+"] has been succesfully created!",
                data:{
                    _id:result._id,
                    name:result.name,
                    active: result.active,
                    startdate: result.startdate,
                    enddate: result.enddate,
                    notes:result.notes
                    // subperiods:result.subperiods
                }
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:"Unable to add the Period",
                error: err
            })
        })
}

exports.periods_add_subperiods = (req,res,next)=>{
    Period.update(
        {_id:req.params.periodid},
        {$push: {subperiods : req.body}},(err,result)=>{
            if(result) {
                res.status(201).json(result)
            }
        })
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
            res.status(200).json(data);
        })
}
