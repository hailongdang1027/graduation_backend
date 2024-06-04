const { response } = require("express");
const { MONGO_DB_CONFIG } = require("../config/app.config");
const { category } = require("../models/category.model");
const { food } = require("../models/food.model");

async function createFood(params, callback) {
    if (!params.foodName) {
        return callback(
            {
                message: "Food Name Required",
            },
            ""
        );
    }
    if (!params.category) {
        return callback(
            {
                message: "Category Required",
            },
            ""
        );
    }
    const foodModel = new food(params);
    foodModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getFoods(params, callback) {
    const foodName = params.foodName;
    const categoryId = params.categoryId;
    var condition = {};

    if (foodName) {
        condition["foodName"] = {
            $regex: new RegExp(foodName), $options: "i"
        };
    }

    if (categoryId) {
        condition["category"] = categoryId;
    }

    if (params.foodIds) {
        condition["foodId"] = {
            $in: params.foodIds.split(",")
        };
    }

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    food
        .find(condition, "foodName foodDescription foodImage foodPrice foodSalePrice foodRating createdAt updatedAt")
        .populate("category", "categoryName categoryImage ")
        .populate("foodsDetail", "foodDetail")
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            // var res = response.map(result => {
            //     if (result.foodsDetail.length > 0) {
            //         result.foodsDetail = result.foodsDetail.map(x => { return x.foodDetail });
            //     }
            //     return result;
            // })
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getFoodById(params, callback) {
    const foodId = params.foodId;

    food
        .findById(foodId)
        .populate("category", "categoryName categoryImage")
        .populate("foodsDetail", "foodDetail")
        .then((response) => {
            // response.foodsDetail = response.foodsDetail.map(x => x.foodDetail);
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateFood(params, callback) {
    const foodId = params.foodId;

    food
        .findByIdAndUpdate(foodId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) {
                callback("Cannot update " + foodId);
            } else {
                callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteFood(params, callback) {
    const foodId = params.foodId;

    food
        .findByIdAndDelete(foodId)
        .then((response) => {
            if (!response) {
                callback("Cannot delete " + foodId);
            } else {
                callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

async function searchFoods(query, callback){
    try{
        let data = await food.find(
            {
                "foodName": { $regex: new RegExp(query, 'i') }
            }
        );
        callback(null, data);
    }catch(error){
        callback(error, null);
    }
}


module.exports = {
    createFood,
    getFoods,
    getFoodById,
    updateFood,
    deleteFood,
    searchFoods
};