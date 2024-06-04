const usersServices = require('../services/user.service');

async function getUsers(req, res) {
    try {
        const users = await usersServices.fetchAllUsers();
        res.json(users);
    } catch (error) {
        console.error("Failed to retrieve users:", error);
        res.status(500).send("Failed to retrieve users.");
    }
}

module.exports = {
    getUsers
};
