const addressServices = require("../services/address.service");



exports.create = (req, res, next) => {
    var model = {
        userId: req.user.userId,
        city: req.body.city,
        house: req.body.house,
        street: req.body.street,
    };
    addressServices.createAddress(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
    
};




exports.findAll = (req, res, next) => {
    addressServices.getAddress({userId: req.user.userId}, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};


exports.update = (req, res, next) => {
    const addressId = req.params.id;
    var model = {
        addressId: addressId,
        userId: req.user.userId,
        city: req.body.city,
        house: req.body.house,
        street: req.body.street,
    };
    addressServices.updateAddress(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.delete = (req, res, next) => {
    var model = {
        addressId: req.params.id,
        userId: req.user.userId,  
    };
    addressServices.deleteAddress(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};