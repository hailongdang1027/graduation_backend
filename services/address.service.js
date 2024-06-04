const { address } = require("../models/address.model");


async function createAddress(params, callback) {
    try {
        if (!params.userId) {
            return callback({
                message: "UserId Required"
            });
        }
        // let addressDB = await address.findOne({userId: params.userId});
        const addressModel = new address(
            {
                userId: params.userId,
                city: params.city,
                house: params.house,
                street: params.street
            }
        );
        let response = await addressModel.save();
        return callback(null, response);
    } catch (error) {
        return callback(error);
    }
}

async function getAddress(params, callback) {
    try {
        const response = await address.find({ userId: params.userId }, "city house street")
        return callback(null, response);
    } catch (error) {
        return callback(error);
    }
}


async function updateAddress(params, callback) {
    const { addressId, city, house, street, userId } = params;
    if (!addressId) {
        return callback({ message: "Address ID is required" });
    }
    try {
        const updateData = { city, house, street };
        let response = await address.findOneAndUpdate(
            {
                _id: addressId,
                userId
            },
            updateData,  // Dữ liệu cập nhật
            { new: true }  
        );
        if (!response) {
            return callback({ message: "No address found"})
        }
        callback(null, response)
    } catch (error) {
        callback({ message: "Error updating address", error});
    }
}

async function deleteAddress(params, callback) {
    const { addressId, userId } = params;

    if (!addressId) {
        return callback({ message: "Address ID is required" });
    }

    try {
        // Đảm bảo rằng chỉ xóa địa chỉ nếu nó thuộc về người dùng đã được xác thực
        let response = await address.findOneAndDelete({ _id: addressId, userId: userId });
        if (!response) {
            return callback({ message: "No address found or user mismatch" });
        }
        callback(null, { message: "Address deleted successfully" });
    } catch (error) {
         callback({ message: "Error deleting address", error });
    }
}

module.exports = {
    createAddress,
    getAddress,
    updateAddress,
    deleteAddress
};