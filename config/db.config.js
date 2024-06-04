const { admin } = require('../config/user.config')
const db = admin.firestore();
module.exports = {
    db
};