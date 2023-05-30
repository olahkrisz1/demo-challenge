const express = require("express");
const router = express.Router();
const Article = require("../models/article");

// Home route - list articles
router.get("/", (req, res) => {
  Article.find({})
    .sort({ createdAt: -1 })
    .then((articles) => {
      res.render("index", { articles });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});

// New article form route
router.get("/new/article", (req, res) => {
  res.render("new");
});

// Create a new article
router.post("/new/article", (req, res) => {
  const { title, text } = req.body;

  if (!title || !text || title.length <= 25 || text.length <= 100) {
    const errorMessage =
      "Invalid input. Title must be longer than 25 characters, and text must be longer than 100 characters.";
    res.render("error", { errorMessage });
    return;
  }

  const newArticle = new Article({
    title,
    text,
    createdAt: new Date(),
  });

  newArticle
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error(error);
      const errorMessage = "Internal Server Error";
      res.render("error", { errorMessage });
    });
});

// Article details route
router.get("/article/:id", (req, res) => {
  const { id } = req.params;

  Article.findById(id)
    .then((article) => {
      if (!article) {
        const errorMessage = "Article not found.";
        res.render("error", { errorMessage });
        return;
      }

      res.render("article", { article });
    })
    .catch((error) => {
      console.error(error);
      const errorMessage = "Internal Server Error";
      res.render("error", { errorMessage });
    });
});

// Delete article route
router.post("/article/:id/delete", (req, res) => {
  const { id } = req.params;

  Article.findByIdAndRemove(id)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error(error);
      const errorMessage = "Internal Server Error";
      res.render("error", { errorMessage });
    });
});

// Edit article form route
router.get("/edit/article/:id", (req, res) => {
  const { id } = req.params;

  Article.findById(id)
    .then((article) => {
      if (!article) {
        const errorMessage = "Article not found.";
        res.render("error", { errorMessage });
        return;
      }

      res.render("edit", { article });
    })
    .catch((error) => {
      console.error(error);
      const errorMessage = "Internal Server Error";
      res.render("error", { errorMessage });
    });
});

// Update article route
router.post("/edit/article/:id", (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;

  if (!title || !text || title.length <= 25 || text.length <= 100) {
    const errorMessage =
      "Invalid input. Title must be longer than 25 characters, and text must be longer than 100 characters.";
    res.render("error", { errorMessage });
    return;
  }

  Article.findById(id)
    .then((article) => {
      if (!article) {
        const errorMessage = "Article not found";
        res.render("error", { errorMessage });
        return;
      }

      article.title = title;
      article.text = text;
      article.updatedAt = new Date();

      return article.save();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.error(error);
      const errorMessage = "Internal Server Error";
      res.render("error", { errorMessage });
    });
});

module.exports = router;
