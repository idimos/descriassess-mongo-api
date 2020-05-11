const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const PeriodController = require('../controllers/periods');

// *****************************************************
// API

router.get('/', checkAuth, PeriodController.periods_get_all);

router.get('/:periodid', checkAuth, PeriodController.periods_get_period);

router.post('/', checkAuth, PeriodController.periods_new_period);
router.post('/:periodid', checkAuth, PeriodController.periods_add_subperiods);
router.delete('/', checkAuth, PeriodController.periods_delete_period);
router.delete('/:periodid', checkAuth, PeriodController.periods_delete_all_subperiods);
router.delete('/:periodid/:subperiodid', checkAuth, PeriodController.periods_delete_subperiod);

// router.delete('/:organisationid', checkAuth, OrganisationController.organisations_delete_organisation);

// router.patch('/:organisationid', checkAuth, OrganisationController.organisations_update_organisation);

module.exports = router; 