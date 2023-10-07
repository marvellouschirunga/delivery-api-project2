const express = require('express');
const router = express.Router();

const deliveriesController = require('../controllers/deliveries');
const validation = require('../middleware/validate');

router.get('/', deliveriesController.getAll);

router.get('/:id', deliveriesController.getSingle);

router.post('/', validation.saveDelivery, deliveriesController.createDelivery);

router.put('/:id', validation.saveDelivery, deliveriesController.updateDelivery);

router.delete('/:id', deliveriesController.deleteDelivery);

module.exports = router;