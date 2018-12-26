const express = require('express');
const userController = require('../db/users/users.controller');

const router = express.Router();

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;
