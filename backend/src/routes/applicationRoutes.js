const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplications,
  updateApplicationStatus,
} = require("../controllers/applicationController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", protect, getApplications);
router.post("/", protect, authorizeRoles("etudiant"), createApplication);
router.patch("/:id/status", protect, authorizeRoles("entreprise"), updateApplicationStatus);

module.exports = router;
