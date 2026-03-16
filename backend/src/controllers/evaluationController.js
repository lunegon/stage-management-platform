const Evaluation = require("../models/Evaluation");
const Internship = require("../models/Internship");

const createEvaluation = async (req, res) => {
  try {
    const { internshipId, note, commentaire } = req.body;

    if (!internshipId || note === undefined) {
      return res.status(400).json({
        message: "internshipId et note sont obligatoires.",
      });
    }

    const internship = await Internship.findById(internshipId);

    if (!internship) {
      return res.status(404).json({
        message: "Stage introuvable.",
      });
    }

    const existingEvaluation = await Evaluation.findOne({
      internship: internshipId,
    });

    if (existingEvaluation) {
      return res.status(409).json({
        message: "Une évaluation existe déjà pour ce stage.",
      });
    }

    const evaluation = await Evaluation.create({
      internship: internshipId,
      enseignant: req.user._id,
      note,
      commentaire: commentaire || "",
    });

    res.status(201).json({
      message: "Évaluation créée avec succès.",
      evaluation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la création de l'évaluation.",
      error: error.message,
    });
  }
};

const getEvaluations = async (req, res) => {
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

const getEvaluationById = async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
      .populate("enseignant", "nom email role")
      .populate({
        path: "internship",
        populate: [
          { path: "etudiant", select: "nom email role" },
          { path: "entreprise", select: "nom email role" },
          { path: "offre", select: "titre localisation statut" },
        ],
      });

    if (!evaluation) {
      return res.status(404).json({
        message: "Évaluation introuvable.",
      });
    }

    res.status(200).json({
      message: "Évaluation récupérée avec succès.",
      evaluation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération de l'évaluation.",
      error: error.message,
    });
  }
};

module.exports = {
  createEvaluation,
  getEvaluations,
  getEvaluationById,
};
