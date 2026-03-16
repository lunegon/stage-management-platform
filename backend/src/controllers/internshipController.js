const Internship = require("../models/Internship");
const Application = require("../models/Application");

const createInternship = async (req, res) => {
  try {
    const { applicationId, dateDebut, dateFin } = req.body;

    if (!applicationId || !dateDebut || !dateFin) {
      return res.status(400).json({
        message: "applicationId, dateDebut et dateFin sont obligatoires.",
      });
    }

    const application = await Application.findById(applicationId)
      .populate("offre")
      .populate("etudiant");

    if (!application) {
      return res.status(404).json({
        message: "Candidature introuvable.",
      });
    }

    if (application.statut !== "acceptee") {
      return res.status(400).json({
        message: "Seule une candidature acceptée peut devenir un stage.",
      });
    }

    if (application.offre.entreprise.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à créer ce stage.",
      });
    }

    const existingInternship = await Internship.findOne({
      application: applicationId,
    });

    if (existingInternship) {
      return res.status(409).json({
        message: "Un stage existe déjà pour cette candidature.",
      });
    }

    const internship = await Internship.create({
      etudiant: application.etudiant._id,
      entreprise: application.offre.entreprise,
      offre: application.offre._id,
      application: application._id,
      dateDebut,
      dateFin,
    });

    res.status(201).json({
      message: "Stage créé avec succès.",
      internship,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la création du stage.",
      error: error.message,
    });
  }
};

const getInternships = async (req, res) => {
  try {
    let internships;

    if (req.user.role === "etudiant") {
      internships = await Internship.find({ etudiant: req.user._id })
        .populate("etudiant", "nom email role")
        .populate("entreprise", "nom email role")
        .populate("offre", "titre description localisation statut")
        .populate("application", "statut message");
    } else if (req.user.role === "entreprise") {
      internships = await Internship.find({ entreprise: req.user._id })
        .populate("etudiant", "nom email role")
        .populate("entreprise", "nom email role")
        .populate("offre", "titre description localisation statut")
        .populate("application", "statut message");
    } else {
      internships = await Internship.find()
        .populate("etudiant", "nom email role")
        .populate("entreprise", "nom email role")
        .populate("offre", "titre description localisation statut")
        .populate("application", "statut message");
    }

    res.status(200).json({
      message: "Liste des stages récupérée avec succès.",
      count: internships.length,
      internships,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des stages.",
      error: error.message,
    });
  }
};

const getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id)
      .populate("etudiant", "nom email role")
      .populate("entreprise", "nom email role")
      .populate("offre", "titre description localisation statut")
      .populate("application", "statut message");

    if (!internship) {
      return res.status(404).json({
        message: "Stage introuvable.",
      });
    }

    if (
      req.user.role === "etudiant" &&
      internship.etudiant._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Accès interdit à ce stage.",
      });
    }

    if (
      req.user.role === "entreprise" &&
      internship.entreprise._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Accès interdit à ce stage.",
      });
    }

    res.status(200).json({
      message: "Stage récupéré avec succès.",
      internship,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération du stage.",
      error: error.message,
    });
  }
};

module.exports = {
  createInternship,
  getInternships,
  getInternshipById,
};
