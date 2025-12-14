const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/users', apiController.getUsers);
router.post('/users', apiController.createUser);
router.get('/users/:id', apiController.getUserById);

module.exports = router;
