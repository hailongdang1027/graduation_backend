const { favoritesFood } = require("../models/favorites.model");
var async = require("async");

async function addFavoriteFood(params, callback){
    try {
        if (!params.userId) {
            return callback({ message: "UserId Required" });
        }

        let favoriteDB = await favoritesFood.findOne({userId: params.userId});
        if (!favoriteDB) {
            const favoriteModel = new favoritesFood({
                userId: params.userId,
                foods: params.foods
            });
            let response = await favoriteModel.save();
            return callback(null, response);
        } else {
            let changesMade = false;
            for (let food of params.foods) {
                let itemIndex = favoriteDB.foods.findIndex(p => p.food.equals(food.food));
                if (itemIndex === -1) {
                    favoriteDB.foods.push({ food: food.food });
                    changesMade = true;
                }
            }

            if (changesMade) {
                await favoriteDB.save();
                return callback(null, favoriteDB);
            } else {
                return callback(null, { message: "All items are already in list", data: favoriteDB });
            }
        }
    } catch (error) {
        console.error("Error adding to favorites:", error);
        return callback({ message: "Error adding", error: error.message || error.toString() });
    }
};

async function getFavorites(params, callback) {
    try {
        // Tìm kiếm giỏ hàng dựa trên userId và populate các thông tin liên quan
        const response = await favoritesFood.findOne({ userId: params.userId })
            .populate({
                path: "foods",
                populate: {
                    path: 'food',
                    model: 'Food',
                    select: 'foodName foodPrice foodSalePrice foodImage',
                    populate: {
                        path: 'category',
                        model: 'Category',
                        select: 'categoryName'
                    }
                }
            });

        // Nếu thành công, trả về dữ liệu thông qua callback
        callback(null, response);
    } catch (error) {
        // Xử lý lỗi và trả về thông qua callback
        callback(error);
    }
}

async function removeFavorites(params, callback) {
    try {
        if (!params.userId || !params.foodId) {
            return callback({ message: "UserId and FoodId are required" });
        }

        let favoriteDB = await favoritesFood.findOne({ userId: params.userId });
        if (!favoriteDB) {
            return callback(null, "Empty favorites");
        }

        let itemIndex = favoriteDB.foods.findIndex(p => p.food.equals(params.foodId));
        if (itemIndex === -1) {
            return callback(null, "Invalid Favorites!");
        } else {
            favoriteDB.foods.splice(itemIndex, 1);
            await favoriteDB.save();
            return callback(null, "Removed from favorites");
        }
    } catch (err) {
        console.error("Error removing from favorites:", err);
        return callback({ message: "Error removing", error: err.toString() });
    }
}

module.exports = {
    addFavoriteFood,
    getFavorites,
    removeFavorites
}
