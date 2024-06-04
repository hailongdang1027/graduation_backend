const MONGO_DB_CONFIG = {
    DB: "mongodb://localhost/food-app",
    PAGE_SIZE: 10,
};

const STRIPE_CONFIG = {
    STRIPE_KEY: "sk_test_",
    CURRENCY: "inr"
};

const ONE_SIGNAL_CONFIG = {
    APP_ID: "fe68ed28-06e4-48a2-ae29-b794be36b44b",
    API_KEY: "OWQwOTY5ODItMmNhNC00MjQ4LWI5ODUtMGQwZmNkOGNhMTcw"
};

module.exports = {
    MONGO_DB_CONFIG,
    STRIPE_CONFIG,
    ONE_SIGNAL_CONFIG
}

