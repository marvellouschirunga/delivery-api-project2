const { async } = require('jshint/src/prod-params');
const mongodb = require('../data/database');
const { request } = require('express');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    //#swagger.tags=['Deliveries']
    const result = await mongodb.getDatabase().db().collection('deliveries').find();
    result.toArray().then((deliveries) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(deliveries);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Deliveries']
    const deliveryId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('deliveries').find({ _id: deliveryId});
    result.toArray().then((deliveries) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(deliveries[0]);
    });
};


const createDelivery = async(req, res) => {
    //#swagger.tags=['Deliveries']
    const deliveryId = new ObjectId(req.params.id);
    const delivery = {
        customerDetails: {
            shipperDetails: {
                postalCode: req.body.customerDetails.shipperDetails.postalCode,
                cityName: req.body.customerDetails.shipperDetails.cityName,
                countryCode: req.body.customerDetails.shipperDetails.countryCode,
                addressLine1: req.body.customerDetails.shipperDetails.addressLine1,
                addressLine2: req.body.customerDetails.shipperDetails.addressLine2
            },
            receiverDetails:{
                postalCode: req.body.customerDetails.receiverDetails.postalCode,
                cityName: req.body.customerDetails.receiverDetails.cityName,
                countryCode: req.body.customerDetails.receiverDetails.countryCode,
                addressLine1: req.body.customerDetails.receiverDetails.addressLine1,
                addressLine2: req.body.customerDetails.receiverDetails.addressLine2
            }
        },
        accounts: req.body.accounts [
            {
                typeCode: req.body.accounts[0].typeCode,
                number: req.body.accounts[0].number
            }
        ],
        productCode: req.body.productCode,
        valueAddedServices: req.body.requestAllValueAddedServices,
        payerCountryCode: req.body.payerCountryCode,
        plannedShippingDateAndTime: req.body.plannedShippingDateAndTime,
        unitOfMeasurement: req.body.unitOfMeasurement,
        isCustomsDeclared: req.body.isCustomsDeclared,
        requestAllValueAddedServices: req.body.requestAllValueAddedServices,
        returnStandardProductsOnly: req.body.returnStandardProductsOnly,
        nextBusinessDay: req.body.nextBusinessDay,
        productTypeCode: req.body.productTypeCode,
        packages: req.body.packages [
            {
                weight: req.body.packages.weight,
                dimensions: {
                    length: req.body.packages[0].dimensions.length,
                    width: req.body.packages[0].dimensions.width,
                    height: req.body.packages[0].dimensions.height
                }
            }
        ]
    };
    const response = await mongodb.getDatabase().db().collection('deliveries').insertOne(delivery);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Sorry, some error occured while creating the delivery.');
    }
};

const updateDelivery = async(req, res) => {
    //#swagger.tags=['Deliveries']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a delivery.');
      }
    const deliveryId = new ObjectId(req.params.id);
    const delivery = {
        customerDetails: {
            shipperDetails: {
                postalCode: req.body.customerDetails.shipperDetails.postalCode,
                cityName: req.body.customerDetails.shipperDetails.cityName,
                countryCode: req.body.customerDetails.shipperDetails.countryCode,
                addressLine1: req.body.customerDetails.shipperDetails.addressLine1,
                addressLine2: req.body.customerDetails.shipperDetails.addressLine2
            },
            receiverDetails: {
                postalCode: req.body.customerDetails.receiverDetails.postalCode,
                cityName: req.body.customerDetails.receiverDetails.cityName,
                countryCode: req.body.customerDetails.receiverDetails.countryCode,
                addressLine1: req.body.customerDetails.receiverDetails.addressLine1,
                addressLine2: req.body.customerDetails.receiverDetails.addressLine2
            }
        },
        accounts: req.body.accounts [
            {
                typeCode: req.body.accounts[0].typeCode,
                number: req.body.accounts[0].number
            }
        ],
        productCode: req.body.productCode,
        valueAddedServices: req.body.requestAllValueAddedServices,
        payerCountryCode: req.body.payerCountryCode,
        plannedShippingDateAndTime: req.body.plannedShippingDateAndTime,
        unitOfMeasurement: req.body.unitOfMeasurement,
        isCustomsDeclared: req.body.isCustomsDeclared,
        requestAllValueAddedServices: req.body.requestAllValueAddedServices,
        returnStandardProductsOnly: req.body.returnStandardProductsOnly,
        nextBusinessDay: req.body.nextBusinessDay,
        productTypeCode: req.body.productTypeCode,
        packages: req.body.packages [
            {
                weight: req.body.packages[0].weight,
                dimensions: {
                    length: req.body.packages[0].dimensions.length,
                    width: req.body.packages[0].dimensions.width,
                    height: req.body.packages[0].dimensions.height
                }
            }
        ]
    };
    const response = await mongodb
    .getDatabase()
    .db()
    .collection('deliveries')
    .replaceOne({ _id: deliveryId }, delivery);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the delivery.');
  }
};


const deleteDelivery = async (req, res) => {
    //#swagger.tags=['Delivery']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a delivery.');
        return;
    }
    const deliveryId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('delivery').deleteOne({ _id: deliveryId });
        if (response.deletedCount > 0) {
            res.status(204).send(); // Deletion successful
        } else {
            res.status(404).json('Delivery not found'); // Delivery not found
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json('Some error occurred while deleting the delivery.');
    }
};


module.exports = {
    getAll,
    getSingle,
    createDelivery,
    updateDelivery,
    deleteDelivery
};
