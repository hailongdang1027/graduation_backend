const { user } = require("../models/user.model");
const { cards } = require("../models/cards.model");
const { order } = require("../models/order.model");

const stripeService = require("../services/stripe.service");
const cartService = require("../services/cart.service");
const { food } = require("../models/food.model");
const { response } = require("express");

async function createOrder(params, callback) {
    try {
        const userDB = await user.findOne({ _id: params.userId });
        if (!userDB) {
            return callback(new Error("User not found"));
        }
        
        var model = {};
        if (!userDB.stripeCustomerID) {
            const results = await stripeService.createClient({
                "name": userDB.name,
                "email": userDB.email
            });
            userDB.stripeCustomerID = results.id;
            await userDB.save();
            model.stripeCustomerID = results.id;
        } else {
            model.stripeCustomerID = userDB.stripeCustomerID;
        }
        
        const cardDB = await cards.findOne({
            customerId: model.stripeCustomerID,
            cardNumber: params.card_Number,
            cardExpMonth: params.card_ExpMonth,
            cardExpYear: params.card_ExpYear
        });

        if (!cardDB) {
            const results = await stripeService.addCard({
                "card_Name": params.card_Name,
                "card_Number": params.card_Number,
                "card_ExpMonth": params.card_ExpMonth,
                "card_ExpYear": params.card_ExpYear,
                "card_CVC": params.card_CVC,
                "customer_Id": model.stripeCustomerID
            });
            const cardModel = new cards({
                cardId: results.card,
                cardName: params.card_Name,
                cardNumber: params.card_Number,
                cardExpMonth: params.card_ExpMonth,
                cardExpYear: params.card_ExpYear,
                cardCVC: params.card_CVC,
                customerId: model.stripeCustomerID
            });
            await cardModel.save();
            model.cardId = results.card;
        } else {
            model.cardId = cardDB.cardId;
        }

        const paymentResults = await stripeService.generatePaymentIntent({
            "receipt_email": userDB.email,
            "amount": params.amount,
            "card_id": model.cardId,
            "customer_id": model.stripeCustomerID
        });

        model.paymentIntentId = paymentResults.id;
        model.client_secret = paymentResults.client_secret;

        const cartDB = await cartService.getCart({ userId: userDB.id });

        if (cartDB) {
            var foods = cartDB.foods.map(food => ({
                food: food.food._id,
                quantity: food.quantity,
                amount: food.food.foodSalePrice
            }));
            var grandTotal = foods.reduce((acc, curr) => acc + curr.amount, 0);

            const orderModel = new order({
                userId: cartDB.userId,
                foods: foods,
                orderStatus: "pending",
                grandTotal: grandTotal
            });
            const savedOrder = await orderModel.save();
            model.orderId = savedOrder._id;
            callback(null, model);
        } else {
            callback(new Error("Cart not found"));
        }
    } catch (error) {
        callback(error);
    }
}

async function updateOrder(params, callback) {
    var model = {
        orderStatus: params.status,
        transactionId: params.transaction_id
    };
    order.findByIdAndUpdate(params.orderId, model, {useFindAndModify: false})
    .then((response) => {
        if (!response) {
            callback('Update Failed');
        }else{
            if (params.status == "success") {
                
            }
            return callback(null, response);
        }
    })
    .catch((error) => {
        return callback(error);
    })
}

async function getOrders(params, callback) {
    order.findOne({userId: params.userId})
    .populate({
        path: "foods",
        populate: {
            path: 'food',
            model: 'Food',
            populate: {
                path: 'category',
                model: 'Category',
                select: 'CategoryName'
            }
        }
    })
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    });
}

module.exports = {
    createOrder,
    updateOrder,
    getOrders
}