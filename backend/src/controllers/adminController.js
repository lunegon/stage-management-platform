const User = require("../models/User");
const Offer = require("../models/Offer");
const Application = require("../models/Application");
const Internship = require("../models/Internship");
const Evaluation = require("../models/Evaluation");
const isValidObjectId = require("../utils/isValidObjectId");

const getAdminStats = async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      offers: await Offer.countDocuments(),
      applications: await Application.countDocuments(),
      internships: await Internship.countDocuments(),
      evaluations: await Evaluation.countDocuments(),
    };

    res.status(200).json({
      message: "Statistiques récupérées avec succès.",
      stats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des statistiques.",
      error: error.message,
    });
  }
};

const resetDatabase = async (req, res) => {
  try {
    await Evaluation.deleteMany({});
    await Internship.deleteMany({});
    await Application.deleteMany({});
    await Offer.deleteMany({});
    await User.deleteMany({ role: { $ne: "administrateur" } });

    res.status(200).json({
      message: "Base de données réinitialisée avec succès.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la réinitialisation de la base.",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      message: "Liste des utilisateurs récupérée avec succès.",
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des utilisateurs.",
      error: error.message,
    });
  }
};

const getAllOffers = async (req, res) => {
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

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("etudiant", "nom email role")
      .populate({
        path: "offre",
        populate: {
          path: "entreprise",
          select: "nom email role",
        },
      });

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

const getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find()
      .populate("etudiant", "nom email role")
      .populate("entreprise", "nom email role")
      .populate("offre", "titre description localisation statut")
      .populate("application", "statut message");

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

const getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate("enseignant", "nom email role")
      .populate({
        path: "internship",
        populate: [
          { path: "etudiant", select: "nom email role" },
          { path: "entreprise", select: "nom email role" },
          { path: "offre", select: "titre localisation statut" },
        ],
      });

    res.status(200).json({
      message: "Liste des évaluations récupérée avec succès.",
      count: evaluations.length,
      evaluations,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des évaluations.",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Identifiant utilisateur invalide." });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable." });
    }

    if (user.role === "administrateur") {
      return res.status(400).json({ message: "Impossible de supprimer un administrateur." });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de l'utilisateur.",
      error: error.message,
    });
  }
};

const deleteOffer = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Identifiant offre invalide." });
    }

    const offer = await Offer.findById(req.params.id);

    if (!offer) {
      return res.status(404).json({ message: "Offre introuvable." });
    }

    await Offer.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Offre supprimée avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de l'offre.",
      error: error.message,
    });
  }
};

const deleteApplication = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Identifiant candidature invalide." });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Candidature introuvable." });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Candidature supprimée avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de la candidature.",
      error: error.message,
    });
  }
};

const deleteInternship = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Identifiant stage invalide." });
    }

    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: "Stage introuvable." });
    }

    await Internship.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Stage supprimé avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la suppression du stage.",
      error: error.message,
    });
  }
};

const deleteEvaluation = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Identifiant évaluation invalide." });
    }

    const evaluation = await Evaluation.findById(req.params.id);

    if (!evaluation) {
      return res.status(404).json({ message: "Évaluation introuvable." });
    }

    await Evaluation.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Évaluation supprimée avec succès." });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de l'évaluation.",
      error: error.message,
    });
  }
};

module.exports = {
  getAdminStats,
  resetDatabase,
  getAllUsers,
  getAllOffers,
  getAllApplications,
  getAllInternships,
  getAllEvaluations,
  deleteUser,
  deleteOffer,
  deleteApplication,
  deleteInternship,
  deleteEvaluation,
};
