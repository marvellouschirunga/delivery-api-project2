const express = require('express');
const router = express.Router();

const deliveriesController = require('../controllers/deliveries');
const validation = require('../middleware/validate');

router.get('/', deliveriesController.getAll);

router.get('/:id',  validation.saveDelivery,deliveriesController.getSingle);

router.post('/', validation.saveDelivery, deliveriesController.createDelivery);

router.put('/:id', validation.saveDelivery, deliveriesController.updateDelivery);

router.delete('/:id',validation.saveDelivery, deliveriesController.deleteDelivery);

module.exports = router;