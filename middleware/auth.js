const jwt = require("jsonwebtoken")

// const admin = require('firebase-admin');
// var serviceAccount = require('../json/key.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

const { admin } = require('../config/user.config')

async function authenticateToken(req, res, next) {
  try {
    const token = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = { userId: decodedToken.uid };
    next();
  } catch (error) {
      res.status(401).send({ message: "Unauthorized" });
  }
    
}

// async function generateAccessToken(userModel) {
//   return jwt.sign({ data: userModelm )
// }

module.exports = {
  authenticateToken,
}