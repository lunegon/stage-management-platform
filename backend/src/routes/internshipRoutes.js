const express = require("express");
const router = express.Router();

const {
  createInternship,
  getInternships,
  getInternshipById,
} = require("../controllers/internshipController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", protect, getInternships);
router.get("/:id", protect, getInternshipById);
router.post("/", protect, authorizeRoles("entreprise"), createInternship);

module.exports = router;
