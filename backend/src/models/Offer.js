const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    localisation: {
      type: String,
      required: true,
      trim: true,
    },
    statut: {
      type: String,
      enum: ["ouverte", "fermee"],
      default: "ouverte",
    },
    entreprise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Offer", offerSchema);
