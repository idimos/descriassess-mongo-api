const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.post('/signin', UserController.users_signin_user);
router.get('/:userId', UserController.users_get_user );
router.post('/signup', UserController.users_signup_user);

module.exports = router; 