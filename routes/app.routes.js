const categoryController = require("../controller/category.controller");
const restaurantController = require("../controller/restaurant.controller");
const foodController = require("../controller/food.controller");
const foodDetailController = require("../controller/food_detail.controller");
const cartController = require("../controller/cart.controller");
const orderController = require("../controller/order.controller");
const favoriteController = require("../controller/favorite.controller");
const addressController = require("../controller/address.controller");
const userController = require('../controller/user.controller');
const notificationController = require("../controller/notification.controller");
const {authenticateToken} = require("../middleware/auth");
const express = require("express");
const router = express.Router();

// Create a new Category
router.post("/category", categoryController.create);
// Retrieve all categorys
router.get("/category", categoryController.findAll);

// Retrieve a single category with id
router.get("/category/:id", categoryController.findOne);
// Update a category with id
router.put("/category/:id", categoryController.update);
// // Delete a category with id
router.delete("/category/:id", categoryController.delete);
// Create a new restaurant
router.post("/restaurant", restaurantController.create);
// Retrieve all restaurants
router.get("/restaurant", restaurantController.findAll);
// Retrieve a single restaurant with id
router.get("/restaurant/:id", restaurantController.findOne);
// Update a restaurant with id
router.put("/restaurant/:id", restaurantController.update);
// // Delete a restaurant with id
router.delete("/restaurant/:id", restaurantController.delete);

router.get("/searchRes/:key", restaurantController.search);
// Create a new Food
router.post("/food", foodController.create);

// Retrieve all foods
router.get("/food", foodController.findAll);

// Retrieve a single food with id
router.get("/food/:id", foodController.findOne);

// Update a food with id
router.put("/food/:id", foodController.update);

// // Delete a food with id
router.delete("/food/:id", foodController.delete);

// // Search a food 
router.get("/searchFood/:key", foodController.search);

router.get('/users', userController.getUsers);



router.post("/foodDetail", foodDetailController.create);
router.delete("/foodDetail/:id", foodDetailController.delete);


router.post("/cart", [authenticateToken], cartController.create);
router.get("/cart", [authenticateToken], cartController.findAll);
router.delete("/cart", [authenticateToken], cartController.delete);
router.delete("/carts", [authenticateToken], cartController.deleteAll);

router.post("/order", [authenticateToken], orderController.create);
router.get("/order", [authenticateToken], orderController.findAll);
router.put("/order", [authenticateToken], orderController.update);

router.post("/favorite", [authenticateToken], favoriteController.create);
router.get("/favorite", [authenticateToken], favoriteController.findAll);
router.delete("/favorite", [authenticateToken], favoriteController.delete);

router.post("/address", [authenticateToken], addressController.create);
router.get("/address", [authenticateToken], addressController.findAll);
router.put("/address/:id", [authenticateToken], addressController.update);
router.delete("/address/:id", [authenticateToken], addressController.delete);

router.get("/SendNotification", notificationController.SendNotification);
router.post("/SendNotificationToDevice", notificationController.SendNotificationToDevice);
module.exports = router;