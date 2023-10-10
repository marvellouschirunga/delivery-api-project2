
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
    const deliveryId = req.params.id;

    try {
        const result = await mongodb.getDatabase().db().collection('deliveries').findOne({ _id: new ObjectId(deliveryId) });

        if (!result) {
            return res.status(404).json('Delivery not found');
            
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};


const createDelivery = async (req, res) => {
    const delivery = req.body;

    try {
        const response = await mongodb.getDatabase().db().collection('deliveries').insertOne(delivery);

        if (response.acknowledged) {
            res.status(201).json('Delivery created successfully');
        } else {
            res.status(500).json('Failed to create delivery');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

const updateDelivery = async (req, res) => {
    const deliveryId = req.params.id;

    if (!ObjectId.isValid(deliveryId)) {
        return res.status(400).json('Invalid delivery ID');
    }

    const delivery = req.body;

    try {
        const response = await mongodb.getDatabase().db().collection('deliveries').replaceOne({ _id: new ObjectId(deliveryId) }, delivery);

        if (response.modifiedCount > 0) {
            res.status(200).json('Delivery updated successfully');
        } else {
            res.status(404).json('Delivery not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};

const deleteDelivery = async (req, res) => {
    const deliveryId = req.params.id;

    try {
        const response = await mongodb.getDatabase().db().collection('deliveries').deleteOne({ _id: new ObjectId(deliveryId) });

        if (response.deletedCount > 0) {
            res.status(204).json('Delivery deleted successfully');
        } else {
            res.status(404).json('Delivery not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
};


module.exports = {
    getAll,
    getSingle,
    createDelivery,
    updateDelivery,
    deleteDelivery
};
