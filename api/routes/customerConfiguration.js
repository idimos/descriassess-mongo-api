const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CustomerConfigurationController = require('../controllers/customerConfiguration');

// *****************************************************
// API


router.get('/:userid', checkAuth, CustomerConfigurationController.customerconfiguration_get_userconfig);

router.post('/', checkAuth, CustomerConfigurationController.customerconfiguration_new_userconfig);


module.exports = router; 