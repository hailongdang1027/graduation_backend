const foodsServices = require("../services/foods.service");
const upload = require("../middleware/food.upload");
const { model } = require("mongoose");
const { food } = require("../models/food.model");

exports.create = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            const path =
                req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                foodName: req.body.foodName,
                category: req.body.category,
                foodDescription: req.body.foodDescription,
                foodPrice: req.body.foodPrice,
                foodSalePrice: req.body.foodSalePrice,
                foodRating: req.body.foodRating,
                foodImage: path != "" ? "/" + path : "",
            };

            foodsServices.createFood(model, (error, results) => {
                if (error) {
                    return next(error);
                }
                return res.status(200).send({
                    message: "Success",
                    data: results,
                });
            });
            // const response = db.collection("foods").doc(id).set();
        }
    });
};

exports.findAll = (req, res, next) => {
    var model = {
        foodIds: req.query.foodIds,
        foodName: req.query.foodName,
        categoryId: req.query.categoryId,
        pageSize: req.query.pageSize,
        page: req.query.page,
        
    };

    foodsServices.getFoods(model, (error, results) => {
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
        foodId: req.params.id,
    };

    foodsServices.getFoodById(model, (error, results) => {
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
                foodId: req.params.id, 
                foodName: req.body.foodName,
                category: req.body.category,
                foodDescription: req.body.foodDescription,
                foodPrice: req.body.foodPrice,
                foodSalePrice: req.body.foodSalePrice,
                foodRating: req.body.foodRating,
                foodImage: path != "" ? "/" + path : "",
            };

            foodsServices.updateFood(model, (error, results) => {
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
        foodId: req.params.id,
    };

    foodsServices.deleteFood(model, (error, results) => {
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
    foodsServices.searchFoods(query, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}