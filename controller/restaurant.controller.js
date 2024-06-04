const restaurantsServices = require("../services/restaurant.service");
const upload = require("../middleware/restaurant.upload");


exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path =
                req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                restaurantName: req.body.restaurantName,
                restaurantDescription: req.body.restaurantDescription,
                restaurantAddress: req.body.restaurantAddress,
                restaurantRating: req.body.restaurantRating,
                restaurantImage: path != "" ? "/" + path : "",
            };

            restaurantsServices.createRestaurant(model, (error, results) => {
                if (error) {
                    return next(error);
                }
                return res.status(200).send({
                    message: "Success",
                    data: results,
                });
            });
        }
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        restaurantName: req.query.restaurantName,
        pageSize: req.query.pageSize,
        page: req.query.page,
    };

    restaurantsServices.getRestaurants(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.findOne = (req, res, next) => {
    var model = {
        restaurantId: req.params.id,
    };

    restaurantsServices.getRestaurantById(model, (error, results) => {
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
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path =
                req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                restaurantId: req.params.id, 
                restaurantName: req.body.restaurantName,
                restaurantDescription: req.body.restaurantDescription,
                restaurantAddress: req.body.restaurantAddress,
                restaurantRating: req.body.restaurantRating,
                restaurantImage: path != "" ? "/" + path : "",
            };

            restaurantsServices.updateRestaurant(model, (error, results) => {
                if (error) {
                    return next(error);
                }
                return res.status(200).send({
                    message: "Success",
                    data: results,
                });
            });
        }
    });
};

exports.delete = (req, res, next) => {
    var model = {
        restaurantId: req.params.id,
    };

    restaurantsServices.deleteRestaurant(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
};

exports.search = async(req, res, next) => {
    const query = req.params.key;
    restaurantsServices.searchRestaurants(query, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}