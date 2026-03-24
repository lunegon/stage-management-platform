const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/adminController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/stats", protect, authorizeRoles("administrateur"), getAdminStats);
router.delete("/reset", protect, authorizeRoles("administrateur"), resetDatabase);

router.get("/users", protect, authorizeRoles("administrateur"), getAllUsers);
router.get("/offers", protect, authorizeRoles("administrateur"), getAllOffers);
router.get("/applications", protect, authorizeRoles("administrateur"), getAllApplications);
router.get("/internships", protect, authorizeRoles("administrateur"), getAllInternships);
router.get("/evaluations", protect, authorizeRoles("administrateur"), getAllEvaluations);

router.delete("/users/:id", protect, authorizeRoles("administrateur"), deleteUser);
router.delete("/offers/:id", protect, authorizeRoles("administrateur"), deleteOffer);
router.delete("/applications/:id", protect, authorizeRoles("administrateur"), deleteApplication);
router.delete("/internships/:id", protect, authorizeRoles("administrateur"), deleteInternship);
router.delete("/evaluations/:id", protect, authorizeRoles("administrateur"), deleteEvaluation);

module.exports = router;
