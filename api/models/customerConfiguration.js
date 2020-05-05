const mongoose = require('mongoose');

const customerCongifurationSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userid : { type: mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    useremail : { type:String, 
        required:false, 
        match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    },
    organisation : {type: mongoose.Schema.ObjectId, ref:'Organisation', required:false, default:null},
    period: { type: mongoose.Schema.ObjectId, ref: 'Period',required:false, default:null},
    createdat : {type:Date, required:true, default:Date.now},
    active: { type: Boolean, default:true},
    readyForAssesment : { type:Boolean, default: false}
})

module.exports = mongoose.model('CustomerConfiguration', customerCongifurationSchema) 