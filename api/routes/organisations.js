const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrganisationController = require('../controllers/organisations');

// *****************************************************
// API

router.get('/', checkAuth, OrganisationController.organisations_gel_all);

router.get('/:organisationid', checkAuth, OrganisationController.organisations_get_organisation);

router.post('/', checkAuth, OrganisationController.organisations_new_organisation);

router.delete('/:organisationid', checkAuth, OrganisationController.organisations_delete_organisation);

router.patch('/:organisationid', checkAuth, OrganisationController.organisations_update_organisation);

module.exports = router; 