const authRoutes = require("./auth/auth.route"); // Corrected the path
const globalRouter =require("express").Router();

// Example route: Get all Items
globalRouter.use("/auth", authRoutes); // Prefix with /auth for clarity

module.exports = globalRouter;
