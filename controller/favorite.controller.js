const favoritesServices = require("../services/favorite.service");

exports.create = (req, res, next) => {
    var model = {
        userId: req.user.userId,
        foods: req.body.foods
    };

    favoritesServices.addFavoriteFood(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}

exports.findAll = (req, res, next) => {
    favoritesServices.getFavorites({userId: req.user.userId}, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}

exports.delete = (req, res, next) => {
    var model = {
        userId: req.user.userId,
        foodId: req.body.foodId
    };

    favoritesServices.removeFavorites(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}
