const db = require('../config/db.config').db; // Adjust this path according to your setup
const { user } = require("../models/user.model");

async function fetchAllUsers() {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();
    const users = [];
    snapshot.forEach(doc => {
        let userData = doc.data();
        userData.userId = doc.id;
        users.push(userData);
    });
    return users;
}

module.exports = {
    fetchAllUsers
};