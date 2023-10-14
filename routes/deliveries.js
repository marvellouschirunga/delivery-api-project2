const express = require('express');
const router = express.Router();

const deliveriesController = require('../controllers/deliveries');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', deliveriesController.getAll);
router.get('/:id', deliveriesController.getSingle);
router.post('/', isAuthenticated, validation.saveDelivery, deliveriesController.createDelivery);
router.put('/:id', isAuthenticated, validation.saveDelivery, deliveriesController.updateDelivery);
router.delete('/:id', isAuthenticated, deliveriesController.deleteDelivery);

module.exports = router;