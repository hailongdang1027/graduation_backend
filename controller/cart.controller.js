const cartService = require("../services/cart.service");

exports.create = (req, res, next) => {
    var model = {
        userId: req.user.userId,
        foods: req.body.foods
    };

    cartService.addCart(model, (error, results) => {
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
    cartService.getCart({userId: req.user.userId}, (error, results) => {
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
        foodId: req.body.foodId,
        quantity: req.body.quantity
    };

    cartService.removeCartItem(model, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}

exports.deleteAll = (req, res, next) => {
    const model = {
        userId: req.user.userId
    };

    cartService.deleteAll(model, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "All items in the cart have been deleted",
            data: result
        });
    });
};

