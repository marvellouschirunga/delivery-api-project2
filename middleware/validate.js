const validator = require('../helpers/validate');

const saveDelivery = (req, res, next) => {
  const validationRule = {
    'customerDetails.shipperDetails.postalCode': 'string',
    'customerDetails.shipperDetails.cityName': 'required|string',
    'customerDetails.shipperDetails.countryCode': 'required|string',
    'customerDetails.shipperDetails.addressLine1': 'required|string',
    'customerDetails.shipperDetails.addressLine2': 'string',
    'customerDetails.receiverDetails.postalCode': 'string',
    'customerDetails.receiverDetails.cityName': 'required|string',
    'customerDetails.receiverDetails.countryCode': 'required|string',
    'customerDetails.receiverDetails.addressLine1': 'required|string',
    'customerDetails.receiverDetails.addressLine2': 'string',
    'accounts.0.typeCode': 'required|string',
    'accounts.0.number': 'required|string',
    productCode: 'required|string',
    payerCountryCode: 'required|string',
    plannedShippingDateAndTime: 'string', 
    unitOfMeasurement: 'required|string',
    isCustomsDeclared: 'boolean', 
    requestAllValueAddedServices: 'boolean', 
    returnStandardProductsOnly: 'boolean', 
    nextBusinessDay: 'boolean', 
    productTypeCode: 'string', 
  };

  // Skip validation for these fields
  delete validationRule.valueAddedServices;
  delete validationRule['packages.0.weight'];
  delete validationRule['packages.0.dimensions.length'];
  delete validationRule['packages.0.dimensions.width'];
  delete validationRule['packages.0.dimensions.height'];

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveDelivery
};
