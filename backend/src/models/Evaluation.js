const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema(
  {
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Internship",
      required: true,
      unique: true,
    },
    enseignant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    note: {
      type: Number,
      required: true,
      min: 0,
      max: 20,
    },
    commentaire: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Evaluation", evaluationSchema);
