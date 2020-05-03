const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const CustomerConfigurationController = require('../controllers/customerConfiguration');

// *****************************************************
// API


router.get('/:useremail', checkAuth, CustomerConfigurationController.customerconfiguration_get_userconfig);

router.post('/', checkAuth, CustomerConfigurationController.customerconfiguration_new_userconfig);

router.delete('/:configid', checkAuth, CustomerConfigurationController.customerconfiguration_delete_userconfig);

module.exports = router; 