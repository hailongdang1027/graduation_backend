const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_DB_CONFIG } = require("./config/app.config")
const errors = require("./middleware/error.js");
const swaggerUi = require("swagger-ui-express"), swaggerDocument = require("./swagger.json");


//firebase
const configFirebase = require('./config/config.firebase.js');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(
        () => {
            console.log("Database connected");
        },
        (err) => {
            console.log("Database cannot be connected: " + err);
        }
    )

app.use(express.json());

//firebase
app.use(cors())


app.use(express.static('public/'));
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.port || configFirebase.port, function () {
    console.log("Ready");
})