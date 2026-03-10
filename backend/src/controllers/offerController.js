const Offer = require("../models/Offer");

const createOffer = async (req, res) => {
  try {
    const { titre, description, localisation, statut } = req.body;

    if (!titre || !description || !localisation) {
      return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
    }

    const offer = await Offer.create({
      titre,
      description,
      localisation,
      statut: statut || "ouverte",
      entreprise: req.user._id,
    });

    res.status(201).json({
      message: "Offre créée avec succès.",
      offer,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("entreprise", "nom email role");
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate("entreprise", "nom email role");

    if (!offer) {
      return res.status(404).json({ message: "Offre introuvable." });
    }

    res.status(200).json(offer);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
};

module.exports = {
  createOffer,
  getOffers,
  getOfferById,
};
