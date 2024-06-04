const { foodDetail } = require("../models/food_detail.model");
const { food } = require("../models/food.model");


async function addFoodDetail(params, callback) {
    if (!params.food) {
        return callback(
            {
                message: "Food Id Required",
            },
            ""
        );
    }
    if (!params.foodDetail) {
        return callback(
            {
                message: "Detail Food Id Required",
            },
            ""
        );
    }
    const foodDetailModel = new foodDetail(params);
    foodDetailModel
        .save()
        .then(async(response) => {
            await food.findOneAndUpdate(
                {
                    _id: params.food
                },
                {
                    $addToSet: {
                        "foodsDetail": foodDetailModel
                    }
                }
            );
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function removeFoodDetail(params, callback) {
    const id = params.id;
    foodDetail.findByIdAndDelete(id)
    .then((response) => {
        if (!response) {
            callback("Food Id not found");
        }
        else{
            callback(null, response)
        }
    })
    .catch((error) => {
        return callback(error)
    });
}



module.exports = {
    addFoodDetail,
    removeFoodDetail
};