const mongoose = require("mongoose");


const food = mongoose.model(
    "Food",
    mongoose.Schema(
        {
            foodName: {
                type: String,
                required: true,
                unique: true,
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
            foodDescription: {
                type: String,
                required: false,
            },
            foodImage: {
                type: String,
            },
            foodPrice: {
                type: Number,
                required: true,
            }, 
            foodSalePrice: {
                type: Number,
                required: false,
                default: 0 
            },
            foodRating: {
                type: Number,
                required: false,
                default: 0
            },
            foodsDetail: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "FoodDetail"
                }
            ]
        },
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.foodId = ret._id.toString();
                    delete ret._id;
                    delete ret._v;
                }
            }
        }
    )
);

module.exports = {
    food
}