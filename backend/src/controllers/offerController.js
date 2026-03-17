const Offer = require("../models/Offer");
const isValidObjectId = require("../utils/isValidObjectId");

const createOffer = async (req, res) => {
  try {
    const { titre, description, localisation, statut } = req.body;

    if (!titre || !description || !localisation) {
      return res.status(400).json({
        message: "Les champs titre, description et localisation sont obligatoires.",
      });
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
    res.status(500).json({
      message: "Erreur serveur lors de la création de l'offre.",
      error: error.message,
    });
  }
};

const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("entreprise", "nom email role");

    res.status(200).json({
      message: "Liste des offres récupérée avec succès.",
      count: offers.length,
      offers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des offres.",
      error: error.message,
    });
  }
};

const getOfferById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Identifiant d'offre invalide.",
      });
    }

    const offer = await Offer.findById(req.params.id).populate(
      "entreprise",
      "nom email role"
    );

    if (!offer) {
      return res.status(404).json({
        message: "Offre introuvable.",
      });
    }

    res.status(200).json({
      message: "Offre récupérée avec succès.",
      offer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'offre.",
      error: error.message,
    });
  }
};

module.exports = {
  createOffer,
  getOffers,
  getOfferById,
};
