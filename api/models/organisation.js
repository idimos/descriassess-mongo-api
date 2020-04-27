const mongoose = require('mongoose');

const organisationSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    orgtypeid : {type: mongoose.Schema.Types.ObjectId, ref:'OrgType', required:true},
    name : {type:String, required:true},
    contact:{
        address:{type:String, required:false},
        tel: {type:String, required:false, pattern:"^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$"}
    },
    email:{
        type:String, 
        required:false, 
        unique:true,
        match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    },
    website: { 
        type:String, 
        require:false, 
        match:/^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/
    }
})

module.exports = mongoose.model('Organisation', organisationSchema)