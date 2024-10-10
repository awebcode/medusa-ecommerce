// routes/customRoutes.js

const express = require("express");
const router = express.Router();

// Example route: Get all items
router.get("/items", (req, res) => {
  // Your logic to fetch items, e.g., from a database
  res.json({ message: "Fetching all items..." });
});

// Example route: Create an item
router.post("/items", (req, res) => {
  // Your logic to create a new item
  const newItem = req.body; // Assuming you send the item data in the request body
  res.status(201).json({ message: "Item created", item: newItem });
});

// More custom routes can be added here...

module.exports = router;
