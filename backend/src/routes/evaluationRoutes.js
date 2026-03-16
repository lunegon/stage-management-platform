const express = require("express");
const router = express.Router();

const {
  createEvaluation,
  getEvaluations,
  getEvaluationById,
} = require("../controllers/evaluationController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", protect, getEvaluations);
router.get("/:id", protect, getEvaluationById);
router.post("/", protect, authorizeRoles("enseignant", "administrateur"), createEvaluation);

module.exports = router;
