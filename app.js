const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const orgtypeRoutes = require('./api/routes/orgtypes');
const organisationRoutes = require('./api/routes/organisations');
const userRoutes = require('./api/routes/users');
const periodRoutes = require('./api/routes/periods');
const customerConfigurationRoutes = require('./api/routes/customerConfiguration');

mongoose.connect(
    "mongodb+srv://idimos:"+ process.env.MONGO_ATLAS_PW + "@cluster0-gg6bz.gcp.mongodb.net/descridb?retryWrites=true&w=majority",
    {
        useNewUrlParser : true,
        useUnifiedTopology: true
    })

app.use(morgan('short')); //logging
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors({
    origin: "*"
}))

// Routes
app.use('/orgtypes', orgtypeRoutes);
app.use('/organisation', organisationRoutes);
app.use('/user',userRoutes);
app.use('/periods',periodRoutes);
app.use('/customerconfiguration',customerConfigurationRoutes);

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