const foodDetailServices = require("../services/foods_detail.service");


exports.create = (req, res, next) => {
    foodDetailServices.addFoodDetail(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results
        });
    })
};

exports.delete = (req, res, next) => {
    var model = {
        id: req.params.id,
    };

    foodDetailServices.removeFoodDetail(model, (error, results) => {
        if (error) {
            return next(error);
        }
        else{
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
};