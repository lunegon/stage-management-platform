# 🎓 Stage Management System (ESGI - UML Project)
## 📌 Présentation du projet
Ce projet est une **plateforme de gestion de stages** développée dans le cadre du module UML à l’ESGI.
L’objectif est de permettre :
- aux **entreprises** de publier des offres
- aux **étudiants** de candidater
- aux **enseignants** d’évaluer les stages
- à un **administrateur** de gérer l’ensemble du système
Le projet respecte une logique métier complète basée sur une modélisation UML.
---
## 🎯 Objectifs pédagogiques
- Mettre en pratique UML (Use Case, Classes, Séquence…)
- Implémenter un système complet (full-stack)
- Gérer des rôles et permissions
- Concevoir une architecture propre (MVC + Docker)
- Créer une application réaliste et exploitable
---
## ⚙️ Stack technique
### Frontend
- React (Vite)
- CSS (custom)
### Backend
- Node.js
- Express
### Base de données
- MongoDB (Mongoose)
### DevOps
- Docker
- Docker Compose
- Nginx (reverse proxy)
---
## 🏗️ Architecture du projet
stage-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── services/
│
├── nginx/
│   └── nginx.conf
│
└── docker-compose.yml
---
## 👥 Rôles utilisateurs
### 👨‍🎓 Étudiant
- Voir les offres
- Postuler
- Suivre ses candidatures
- Voir ses stages
- Consulter ses évaluations
### 🏢 Entreprise
- Créer des offres
- Voir les candidatures
- Accepter / refuser
- Générer un stage
### 👨‍🏫 Enseignant
- Voir les stages
- Créer des évaluations
- Suivre les étudiants
### 🛠️ Administrateur
- Supprimer utilisateurs / offres / candidatures / stages / évaluations
- Réinitialiser la base pour démonstration
- Gérer l’ensemble du système
---
## 🔄 Workflow métier
1. Une entreprise crée une offre
2. Un étudiant candidate
3. L’entreprise accepte la candidature
4. Un stage est automatiquement créé
5. L’offre devient indisponible
6. Un enseignant évalue le stage
7. L’étudiant consulte son évaluation
---
## 🚀 Installation & lancement
### 1. Cloner le projet
```bash
git clone <repo>
cd stage-app
2. Lancer le projet
docker compose up -d --build
3. Accès
• Frontend : http://localhost
• API : http://localhost/api
⸻
🔐 Comptes de test
Étudiant
email: sam@test.com
password: 123456
Entreprise
email: entreprise@test.com
password: 123456
Enseignant
email: prof@test.com
password: 123456
Admin
email: admin@test.com
password: 123456

⸻
📡 API (exemples)
Auth
• POST /api/auth/register
• POST /api/auth/login
Offres
• GET /api/offers
• POST /api/offers
Candidatures
• POST /api/applications
• GET /api/applications
Stages
• GET /api/internships
Évaluations
• GET /api/evaluations
• POST /api/evaluations
Admin
• DELETE /api/admin/users/:id
• DELETE /api/admin/offers/:id
• DELETE /api/admin/applications/:id
• DELETE /api/admin/internships/:id
• DELETE /api/admin/evaluations/:id
⸻
🧠 Logique UML respectée
Le projet respecte :
• séparation des rôles
• relations entre entités :
• User
• Offer
• Application
• Internship
• Evaluation
• enchaînement logique :
• candidature → acceptation → stage → évaluation
⸻
⚠️ Règles métier importantes
• Une candidature unique par étudiant/offre
• Une offre acceptée devient indisponible
• Seule l’entreprise peut accepter/refuser
• Une évaluation est liée à un stage
• Seul l’enseignant peut évaluer
⸻
🧪 Tests réalisés
• Tests API avec curl
• Vérification des rôles
• Validation des erreurs (400 / 403 / 404 / 500)
• Test complet du workflow métier
⸻
🎨 Améliorations UI/UX
• Dashboard par rôle
• Navigation claire
• Statuts colorés (accepté/refusé)
• Feedback utilisateur (messages)
• Pages structurées
⸻
📈 Améliorations possibles
• Notifications (email)
• Upload CV
• Dashboard analytics
• Pagination
• Filtres avancés
• Sécurité renforcée (JWT refresh, rate limit)
⸻
👨‍💻 Auteurs
• Lucas Goncalves
• Sam
• Guillaume
⸻
📚 Contexte académique
Projet réalisé dans le cadre du module :
UML - ESGI Paris
⸻
✅ Conclusion
Ce projet propose une implémentation complète d’un système de gestion de stages, respectant les contraintes UML et intégrant une architecture moderne full-stack avec Docker.
Il démontre :
• la maîtrise du backend et frontend
• la compréhension des flux métier
• la capacité à structurer un projet professionnel
