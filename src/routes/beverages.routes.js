const express = require('express');
const beveragesController = require('../db/beverages/beverages.controller');
const router = express.Router();

router.get('/beverages', beveragesController.getAll);
router.post('/beverages', beveragesController.create);

module.exports = router;
