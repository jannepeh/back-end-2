const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const mockData = require("./data/mockData.json");

// Define users array globally
const users = [
  { user_id: 1606, name: "John Doe", email: "john@example.com" },
  { user_id: 3671, name: "Jane Smith", email: "jane@example.com" },
];

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

// Routes

// Landing page
app.get("/", (req, res) => {
  res.render("index", {
    title: "Media API",
    description: "Welcome to the Media API landing page",
  });
});

// Get all media items
app.get("/api/media", (req, res) => {
  res.status(200).json(mockData);
});

// Get a specific media item by ID
app.get("/api/media/:id", (req, res) => {
  const mediaItem = mockData.find((item) => item.media_id == req.params.id);
  if (mediaItem) {
    res.status(200).json(mediaItem);
  } else {
    res.status(404).json({ message: "Media item not found" });
  }
});

// Get user by ID
app.get("/api/user/:id", (req, res) => {
  const user = users.find((u) => u.user_id == req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// Add a new user
app.post("/api/user", (req, res) => {
  const newUser = req.body;
  if (newUser && newUser.name && newUser.email) {
    res.status(201).json({ message: "User created", user: newUser });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

// Modify a user by ID
app.put("/api/user/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.user_id === userId);

    if (user) {
      // Update the user data
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      res.status(200).json({ message: "User updated", user });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a user by ID
app.delete("/api/user/:id", (req, res) => {
  res.status(200).json({ message: "User deleted", userId: req.params.id });
});

// Serve the app
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/**
 * @api
 * @apiSuccess
 */
app.get("/api/media", (req, res) => {
  res.status(200).json(mockData);
});

/**
 * @api /api/media/:id
 * @apiParam
 * @apiSuccess
 */
app.get("/api/media/:id", (req, res) => {
  const mediaItem = mockData.find((item) => item.media_id == req.params.id);
  if (mediaItem) {
    res.status(200).json(mediaItem);
  } else {
    res.status(404).json({ message: "Media item not found" });
  }
});
