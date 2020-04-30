const mongoose = require('mongoose');

const customerCongifurationSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userid: { type: mongoose.Schema.Types.ObjectId, ref:'user',required:true},
    organisationid : {type: mongoose.Schema.Types.ObjectId, ref:'Organisation', required:true},
    periodid: { type: mongoose.Schema.Types.ObjectId, ref:'Period',required:true},
    createdat : {type:Date, required:true, default:Date.now},
    active: { type: Boolean, default:true}
})

module.exports = mongoose.model('CustomerConfiguration', customerCongifurationSchema)