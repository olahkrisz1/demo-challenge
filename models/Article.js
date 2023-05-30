const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 25,
    },
    text: {
      type: String,
      required: true,
      minlength: 100,
    },
  },
  { timestamps: true }
);

articleSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
