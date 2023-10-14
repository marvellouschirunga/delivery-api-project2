
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('deliveries').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

//get by id

const getSingle = async (req, res) => {
    //#swagger.tags=['deliveries']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid delivery id to find a delivery')
    }
    // Convert the request parameter to a valid ObjectId
    const userId = new ObjectId(req.params.id);
    
    try {
        // Retrieve a specific delivery from the database using the provided ID
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('deliveries')
            .find({_id: userId })
            .toArray((err, lists) => {
                if (err) {
                    // If there's an error, return a 400 Bad Request response with the error message
                    res.status(400).json({ message: err });
                }
            })
            .then((deliveries) => {
            // Set the response headers and send a 200 OK response with the found deliveries data
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(deliveries[0]);
        });
    } catch (err) {
        // If there's an error, return a 500 Internal Server Error response with the error message
        res
            .status(500)
            .json(response.err || "An error occurred. Please try again.");
    }
};


const createDelivery = async (req, res) => {
    const delivery = req.body;

    try {
        const response = await mongodb.getDatabase().db().collection('deliveries').insertOne(delivery);

        if (response.acknowledged) {
            res.status(201).json({ message: 'Delivery created successfully' });
        } else {
            res.status(500).json({ message: 'Failed to create delivery' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const updateDelivery = async (req, res) => {
    //#swagger.tags=['deliveries']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid delivery id to update a delivery')
    }
    // Convert the request parameter to a valid ObjectId
    const deliveryId = new ObjectId(req.params.id);
    
    // Create a delivery object from the request body
    const deliveries = {
        customerDetails: {
            shipperDetails: {
                postalCode: req.body.customerDetails.shipperDetails.postalCode,
                cityName: req.body.customerDetails.shipperDetails.cityName,
                countryCode: req.body.customerDetails.shipperDetails.countryCode,
                addressLine1: req.body.customerDetails.shipperDetails.addressLine1,
                addressLine2: req.body.customerDetails.shipperDetails.addressLine2,
            },
            receiverDetails: {
                postalCode: req.body.customerDetails.receiverDetails.postalCode,
                cityName: req.body.customerDetails.receiverDetails.cityName,
                countryCode: req.body.customerDetails.receiverDetails.countryCode,
                addressLine1: req.body.customerDetails.receiverDetails.addressLine1,
                addressLine2: req.body.customerDetails.receiverDetails.addressLine2,
                countyName: req.body.customerDetails.receiverDetails.countyName,
            },
        },
        accounts: [
            {
                typeCode: req.body.accounts[0].typeCode,
                number: req.body.accounts[0].number,
            },
        ],
        productCode: req.body.productCode,
        valueAddedServices: req.body.valueAddedServices,
        payerCountryCode: req.body.payerCountryCode,
        plannedShippingDateAndTime: req.body.plannedShippingDateAndTime,
        unitOfMeasurement: req.body.unitOfMeasurement,
        isCustomsDeclared: req.body.isCustomsDeclared,
        requestAllValueAddedServices: req.body.requestAllValueAddedServices,
        returnStandardProductsOnly: req.body.returnStandardProductsOnly,
        nextBusinessDay: req.body.nextBusinessDay,
        productTypeCode: req.body.productTypeCode,
        packages: [
            {
                weight: req.body.packages[0].weight,
                dimensions: {
                    length: req.body.packages[0].dimensions.length,
                    width: req.body.packages[0].dimensions.width,
                    height: req.body.packages[0].dimensions.height,
                },
            },
        ],
    };
    
    // Replace the existing contemporary issue in the database with the updated one
    const response = await mongodb.getDatabase().db().collection('deliveries').replaceOne({ _id: deliveryId }, deliveries);
    if (response.modifiedCount > 0) {
        // If modification is successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error or no modifications, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while updating the delivery.');
        console.error('MongoDB Error:', response.err);
    }
};

const deleteDelivery = async (req, res) => {
    //#swagger.tags=['deliveries']
    // Check if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(req.params.id)) {
        // If not valid, return a 400 Bad Request response with an error message
        res.status(400).json('Must use a valid delivery id to delete a delivery')
    }
    // Convert the request parameter to a valid ObjectId
    const deliveryId = new ObjectId(req.params.id);
    // Delete the delivery from the database
    const response = await mongodb.getDatabase().db().collection('deliveries').deleteOne({ _id: deliveryId });
    if (response.deletedCount > 0) {
        // If deletion is successful, send a 204 No Content response
        res.status(204).send();
    } else {
        // If there's an error or no deletions, return a 500 Internal Server Error response with the error message
        res.status(500).json(response.err || 'some error occurred while deleting the delivery.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createDelivery,
    updateDelivery,
    deleteDelivery
};
