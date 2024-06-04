const { cart } = require("../models/cart.model");
var async = require("async");

async function addCart(params, callback) {
    try {
        if (!params.userId) {
            return callback({
                message: "UserId Required"
            });
        }
        let cartDB = await cart.findOne({userId: params.userId}); 
        if (cartDB == null) {
            const cartModel = new cart({
                userId: params.userId,
                foods: params.foods
            });
            let response = await cartModel.save();
            return callback(null, response);
        } else if (cartDB.foods.length == 0) {
            cartDB.foods = params.foods;
            await cartDB.save();
            return callback(null, cartDB);
        } else {
            await async.eachSeries(params.foods, async function(food, asyncDone) {
                let itemIndex = cartDB.foods.findIndex(p => p.food == food.food);
                if (itemIndex === -1) {
                    cartDB.foods.push({
                        food: food.food,
                        quantity: food.quantity
                    });
                    await cartDB.save();
                } else {
                    cartDB.foods[itemIndex].quantity += food.quantity;
                    await cartDB.save();
                }
            });
            return callback(null, cartDB);
        }
    } catch (err) {
        return callback(err);
    }
}

async function getCart(params, callback) {
    try {
        // Tìm kiếm giỏ hàng dựa trên userId và populate các thông tin liên quan
        const response = await cart.findOne({ userId: params.userId })
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

async function removeCartItem(params, callback) {
    try {
        let cartDB = await cart.findOne({userId: params.userId}); 
        if (!cartDB) {
            return callback(null, "Empty cart");
        }
        const foodId = params.foodId;
        const quantity = params.quantity;
        let itemIndex = cartDB.foods.findIndex(p => p.food == foodId);
        if (itemIndex === -1) {
            return callback(null, "Invalid Food!");
        } else {
            if (cartDB.foods[itemIndex].quantity === quantity) {
                cartDB.foods.splice(itemIndex, 1);
            } else if (cartDB.foods[itemIndex].quantity > quantity) {
                cartDB.foods[itemIndex].quantity -= quantity;
            } else {
                return callback(null, "Wrong update");
            }
            await cartDB.save();
            return callback(null, "Updated");
        }
    } catch (err) {
        return callback(err);
    }
}

async function deleteAll(params, callback) {
    try {
        const { userId } = params;
        const cartDB = await cart.findOne({ userId: userId });
        if (!cartDB) {
            return callback({
                message: "Cart not found or already empty"
            });
        }

        cartDB.foods = [];
        await cartDB.save();
        return callback(null, {
            message: "Cart has been emptied"
        });
    } catch (err) {
        return callback({
            message: "Error clearing the cart",
            error: err
        });
    }
}

module.exports = {
    addCart,
    getCart,
    removeCartItem,
    deleteAll
}