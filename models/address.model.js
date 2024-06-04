const mongoose = require("mongoose");


const address = mongoose.model(
    "Address",
    mongoose.Schema(
        {
            userId: {
                type: String, 
                required: true
            },
            city: {
                type: String,
                required: true,
            },
            house: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            }
        },
        {
            toJSON: {
                transform: function (doc, ret) {
                    ret.addressId = ret._id.toString();
                    delete ret._id;
                    delete ret._v;
                }
            }
        }
    )
);

module.exports = {
    address,
}