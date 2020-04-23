const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const orgtypeRoutes = require('./api/routes/orgtypes');

// mongoose.connect("",{
//     useMongoClient:true
// })

app.use(morgan('dev')); //logging
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors({
    origin: "*"
}))

// Routes
app.use('/orgtypes', orgtypeRoutes);

// Handling Errors
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    });
});

module.exports = app;