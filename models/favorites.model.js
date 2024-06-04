const mongoose = require("mongoose");

const favoritesFood = mongoose.model(
    "FavoritesFood",
    mongoose.Schema(
        {
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
                }
            ]
        }, 
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.favoriteId = ret._id.toString();
                    delete ret._id;
                    delete ret._v;
                }
            },
            timestamps: true
        }
    )
);

module.exports = {
    favoritesFood
}