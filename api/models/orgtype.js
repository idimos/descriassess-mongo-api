const mongoose = require('mongoose');

const orgtypeSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: String
})

module.exports = mongoose.model('OrgType', orgtypeSchema);