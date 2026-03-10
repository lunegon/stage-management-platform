const express = require("express");
const router = express.Router();

const {
  createOffer,
  getOffers,
  getOfferById,
} = require("../controllers/offerController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/", getOffers);
router.get("/:id", getOfferById);
router.post("/", protect, authorizeRoles("entreprise"), createOffer);

module.exports = router;
