
const mongoose = require("mongoose");


const foodDetail = mongoose.model(
    "FoodDetail",
    mongoose.Schema(
        { 
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food"
            },
            foodDetail: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food"
            }
        },
        {
            toJSON: {
                transform: function (doc, ret) {
                    delete ret._v;
                }
            },
            timestamps: true
        }
    )
);

module.exports = {
    foodDetail
}