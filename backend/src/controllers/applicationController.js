const Application = require("../models/Application");
const Offer = require("../models/Offer");

const createApplication = async (req, res) => {
  try {
    const { offreId, message } = req.body;

    if (!offreId) {
      return res.status(400).json({
        message: "L'identifiant de l'offre est obligatoire.",
      });
    }

    const offer = await Offer.findById(offreId);

    if (!offer) {
      return res.status(404).json({
        message: "Offre introuvable.",
      });
    }

    // règle métier : une offre fermée ne peut pas recevoir de candidature
    if (offer.statut !== "ouverte") {
      return res.status(400).json({
        message: "Cette offre n'accepte plus de candidatures.",
      });
    }

    // règle métier : un étudiant ne peut pas postuler deux fois
    const existingApplication = await Application.findOne({
      etudiant: req.user._id,
      offre: offreId,
    });

    if (existingApplication) {
      return res.status(409).json({
        message: "Vous avez déjà postulé à cette offre.",
      });
    }

    const application = await Application.create({
      etudiant: req.user._id,
      offre: offreId,
      message: message || "",
    });

    res.status(201).json({
      message: "Candidature envoyée avec succès.",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la création de la candidature.",
      error: error.message,
    });
  }
};

const getApplications = async (req, res) => {
  try {
    let applications;

    if (req.user.role === "etudiant") {
      applications = await Application.find({ etudiant: req.user._id })
        .populate("etudiant", "nom email role")
        .populate({
          path: "offre",
          populate: {
            path: "entreprise",
            select: "nom email role",
          },
        });
    } else if (req.user.role === "entreprise") {
      const offers = await Offer.find({ entreprise: req.user._id }).select("_id");

      const offerIds = offers.map((offer) => offer._id);

      applications = await Application.find({ offre: { $in: offerIds } })
        .populate("etudiant", "nom email role")
        .populate({
          path: "offre",
          populate: {
            path: "entreprise",
            select: "nom email role",
          },
        });
    } else {
      applications = await Application.find()
        .populate("etudiant", "nom email role")
        .populate({
          path: "offre",
          populate: {
            path: "entreprise",
            select: "nom email role",
          },
        });
    }

    res.status(200).json({
      message: "Liste des candidatures récupérée avec succès.",
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des candidatures.",
      error: error.message,
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["acceptee", "refusee"].includes(status)) {
      return res.status(400).json({
        message: "Le statut doit être 'acceptee' ou 'refusee'.",
      });
    }

    const application = await Application.findById(req.params.id).populate("offre");

    if (!application) {
      return res.status(404).json({
        message: "Candidature introuvable.",
      });
    }

    // règle métier : seule l'entreprise propriétaire peut modifier la candidature
    if (application.offre.entreprise.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à modifier cette candidature.",
      });
    }

    // règle métier : impossible de modifier une candidature déjà traitée
    if (application.statut !== "en_attente") {
      return res.status(400).json({
        message: "Cette candidature a déjà été traitée.",
      });
    }

    application.statut = status;
    await application.save();

    res.status(200).json({
      message: "Statut de la candidature mis à jour avec succès.",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la mise à jour du statut.",
      error: error.message,
    });
  }
};

module.exports = {
  createApplication,
  getApplications,
  updateApplicationStatus,
};
