const mongoose = require("mongoose");

const cart = mongoose.model(
    "Cart",
    mongoose.Schema({
        userId: {
            type: String, 
            required: true
        },
        foods: [
            {
                food: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }, {
        toJSON: {
            transform: function (model, ret) {
                ret.cartId = ret._id.toString()
                delete ret._id;
                delete ret._v;
            }
        }
    },{
        timestamps: true
    })
);

module.exports = {
    cart
}