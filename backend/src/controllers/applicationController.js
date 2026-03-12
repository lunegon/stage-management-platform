samsam
sam_lepompier
Ne pas déranger

samsam — 10/03/2026 22:01
?
lunegon — 10/03/2026 22:02
pour le projetg
samsam — 10/03/2026 22:03
ah oui c'est vrai
samsam
 a commencé un appel qui a duré 37 minutes. — 10/03/2026 22:03
lunegon — 10/03/2026 22:15
ssh ubuntu@79.137.35.83
19102005Lucas
ssh-keygen -t ed25519 -C "sampayet18@gmail.com"
cat ~/.ssh/id_ed25519.pub
ssh -T git@github.com
ssh-keygen -t ed25519 -C "sampayet18@gmail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
cat ~/.ssh/id_ed25519.pub
lunegon — 10/03/2026 22:23
ssh -T git@github.com
git config --global user.name "sampayet18-cell"
git config --global user.email "sampayet18@gmail.com"
git remote -v
git remote set-url origin git@github.com:sampayet18_cell/stage-management-platform.git
git remote set-url origin git@github.com:lunegon/stage-management_platform.git
samsam — 10/03/2026 22:26
Image
lunegon — 10/03/2026 22:26
cd /opt/stage-app
git remote set-url origin git@github.com:lunegon/stage-management-platform.git
git remote -v
git push
echo "test push sam" >> test.txt
git add .
git add .
git commit -m "Test push from Sam"
git push
docker compose  up -d
lunegon — 11:09
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    etudiant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    statut: {
      type: String,
      enum: ["en_attente", "acceptee", "refusee"],
      default: "en_attente",
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index({ etudiant: 1, offre: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
nano backend/src/controllers/applicationController.js
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
... (45lignes restantes)

message.txt
4 Ko
git add .
git commit -m "Add Application model"
git push
nano backend/src/routes/applicationRoutes.js
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
git add .
git commit -m "Add Application routes"
git push
lunegon — 11:16
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const offerRoutes = require("./routes/offerRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/applications", applicationRoutes);

module.exports = app;
git add .
git commit -m "Connect Application routes to app"
git push
cd /opt/stage-app
docker compose up -d --build
curl -X POST http://localhost/api/auth/register \
-H "Content-Type: application/json" \
-d '{"nom":"Sam","email":"sam@test.com","password":"123456","role":"etudiant"}'
curl -X POST http://localhost/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"sam@test.com","password":"123456"}'
curl http://localhost/api/offers
samsam — 11:19
Image
lunegon — 11:20
cd /opt/stage-app
docker ps
docker logs stage_backend --tail 50
samsam — 11:21
root@vps-ac4ecb72:/opt/stage-app# docker logs stage_backend --tail 50

SyntaxError: Unexpected identifier 'express'
    at wrapSafe (node:internal/modules/cjs/loader:1464:18)
    at Module._compile (node:internal/modules/cjs/loader:1495:20)
    at Module._extensions..js (node:internal/modules/cjs/loader:1623:10)

message.txt
3 Ko
lunegon — 11:23
cd /opt/stage-app
docker compose down
docker compose up -d --build
curl http://localhost/api/health
docker compose logs stage_backend -f
samsam — 11:25
root@vps-ac4ecb72:/opt/stage-app# docker compose logs stage_backend -f
no such service: stage_backend
root@vps-ac4ecb72:/opt/stage-app#
lunegon — 11:26
l
cd /opt/stage-app
docker compose down
docker compose up -d --build
docker logs stage_backend --tail 50
docker logs stage_nginx --tail 50
samsam — 11:28
root@vps-ac4ecb72:/opt/stage-app# docker compose logs stage_backend -f
no such service: stage_backend
root@vps-ac4ecb72:/opt/stage-app# cd /opt/stage-app
docker compose down
docker compose up -d --build
[+] down 5/5

message.txt
16 Ko
lunegon — 11:29
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    etudiant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    statut: {
      type: String,
      enum: ["en_attente", "acceptee", "refusee"],
      default: "en_attente",
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index({ etudiant: 1, offre: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    etudiant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    offre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: true,
    },
    statut: {
      type: String,
      enum: ["en_attente", "acceptee", "refusee"],
      default: "en_attente",
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

applicationSchema.index({ etudiant: 1, offre: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
cat /opt/stage-app/backend/src/models/Application.js
const Application = require("../models/Application");
const Offer = require("../models/Offer");

const createApplication = async (req, res) => {
  try {
    const { offreId, message } = req.body;

message.txt
4 Ko
﻿
lunegon
lunegon
 
 
 
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

    if (application.offre.entreprise.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à modifier cette candidature.",
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
