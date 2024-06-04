const mongoose = require("mongoose");

const order = mongoose.model(
    "Order",
    mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        foods: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        grandTotal: {
            type: Number,
            required: true
        },
        orderStatus: {
            type: String,
            required: true
        },
        transactionId: {
            type: String
        }
    }, { timestamps: true})
);

module.exports = {
    order
}