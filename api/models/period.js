const mongoose = require('mongoose');

const PeriodSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: { type:String, required: true },
    active:{type:Boolean, required:true, default:false},
    startdate:{ type:Date,required:true  },
    enddate:{ type:Date, required:true  },
    subperiods:[ {
        name:{ type:String, required: true },
        startdate:{ type:Date,required:true },
        enddate:{ type:Date, required:true  },
        notes:{type:String, required:false}
    } ],
    notes: { type:String, required:false}
})

PeriodSchema.pre('validate', function (next) {
    if (this.startdate >= this.enddate) {
      return next(new Error('Invalid periods'));
    }
    next();
});

module.exports = mongoose.model('Period', PeriodSchema);
