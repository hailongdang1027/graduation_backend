const { MONGO_DB_CONFIG } = require("../config/app.config");
const { restaurant } = require("../models/restaurant.model");

async function createRestaurant(params, callback) {
    if (!params.restaurantName) {
        return callback(
            {
                message: "Restaurant Name Required",
            },
            ""
        );
    }
    const restaurantModel = new restaurant(params);
    restaurantModel
        .save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getRestaurants(params, callback) {
    const restaurantName = params.restaurantName;
    var condition = restaurantName
        ? { restaurantName: { $regex: new RegExp(restaurantName), $options: "i" } }
        : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    restaurant
        .find(condition, "restaurantName restaurantDescription restaurantImage restaurantAddress restaurantRating")
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getRestaurantById(params, callback) {
    const restaurantId = params.restaurantId;

    restaurant
        .findById(restaurantId)
        .then((response) => {
            if (!response) {
                callback("Not found " + restaurantId);
            } else {
                callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateRestaurant(params, callback) {
    const restaurantId = params.restaurantId;

    restaurant
        .findByIdAndUpdate(restaurantId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) {
                callback("Cannot update " + restaurantId);
            } else {
                callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}

async function deleteRestaurant(params, callback) {
    const restaurantId = params.restaurantId;

    restaurant
        .findByIdAndDelete(restaurantId)
        .then((response) => {
            if (!response) {
                callback("Cannot delete " + restaurantId);
            } else {
                callback(null, response);
            }
        })
        .catch((error) => {
            return callback(error);
        });
}


async function searchRestaurants(query, callback){
    try{
        let data = await restaurant.find(
            {
                "restaurantName": { $regex: new RegExp(query, 'i') }
            }
        );
        callback(null, data);
    }catch(error){
        callback(error, null);
    }
}

module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
    searchRestaurants
};