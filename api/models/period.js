const mongoose = require('mongoose');

var SubPeriodSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: { type:String, required: true },
    startdate:{ type:Date,required:true  },
    enddate:{ type:Date, required:true  },
    notes: { type:String, required:false}
})

var PeriodSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: { type:String, required: true },
    active:{type:Boolean, required:true, default:false},
    startdate:{ type:Date,required:true  },
    enddate:{ type:Date, required:true  },
    subperiods:[ SubPeriodSchema ],
    notes: { type:String, required:false}
})

PeriodSchema.pre('validate', function (next) {
    if (this.startdate >= this.enddate) {
      return next(new Error('[Invalid period dates. End Date should be greater tha start date.]'));
    }
    console.log("Period validation is ok");
    next();
});

SubPeriodSchema.pre('validate', function(next){
    if (this.startdate >= this.enddate){
        return next(new Error('Invalid subperiod -'+ toString(this.startdate)+ ' >= '+ toString(tis.enddate)));
    }
    console.log("Subperiod validation is ok");
    next();
})

module.exports = mongoose.model('Period', PeriodSchema);
