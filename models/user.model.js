const mongoose = require('mongoose');

const user = mongoose.model(
    "User",
   mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        stripeCustomerID:{
            type: String,
        }
   }, {
    toJSON: {
        transform : function (doc, ret) {
            ret.userId = ret._id.toString();
            delete ret._id;
            delete ret._v;
        }
    }
   }, {
    timestamps: true
   }

   
   )
);

module.exports = {
    user
}