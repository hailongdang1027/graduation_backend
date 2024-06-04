const mongoose = require("mongoose");
const restaurant = mongoose.model(
    "Restaurant",
    mongoose.Schema(
        {
            restaurantName: {
                type: String,
                required: true,
                unique: true,
            },
            restaurantDescription: {
                type: String,
                required: false,
            },
            restaurantImage: {
                type: String,
            },
            restaurantAddress: {
                type: String,
                required: true,
            },
            restaurantRating: {
                type: Number,
                required: false,
            },

        },
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.restaurantId = ret._id.toString();
                    delete ret._id;
                    delete ret._v;
                }
            }
        }
    )
);

module.exports = {
    restaurant,
}