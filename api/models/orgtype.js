const mongoose = require('mongoose');

const orgTypeSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true}
})

module.exports = mongoose.model('OrgType', orgTypeSchema);