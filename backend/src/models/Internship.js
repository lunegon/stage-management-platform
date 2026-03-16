const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    etudiant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    entreprise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      unique: true,
    },
    dateDebut: {
      type: Date,
      required: true,
    },
    dateFin: {
      type: Date,
      required: true,
    },
    statut: {
      type: String,
      enum: ["en_cours", "termine", "annule"],
      default: "en_cours",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Internship", internshipSchema);
