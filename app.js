const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://cerbera:cerbera@cluster4.lf70obn.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Set up EJS as the view engine
app.set("view engine", "ejs");

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Set up routes
const articleRoutes = require("./routes/articleRoutes");
app.use("/", articleRoutes);

// Start the server
app.listen(2000, () => {
  console.log("Server started on port 2000");
});
