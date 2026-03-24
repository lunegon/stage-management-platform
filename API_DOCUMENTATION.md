# 🚀 API Documentation - Plateforme de Gestion de Stages
---
## 🌐 Base URL
### Local (VPS)
```bash
http://localhost/api
```
Accès externe
```bash
http://79.137.35.83/api
```

⸻
📌 Présentation générale
Cette API permet de gérer l’ensemble du cycle de vie d’un stage :
• création d’offres par une entreprise
• candidature d’un étudiant
• validation ou refus par l’entreprise
• création d’un stage
• évaluation par un enseignant
• supervision globale par un administrateur
L’API suit une logique REST et s’appuie sur une authentification JWT.
⸻
🔐 Authentification
Header utilisé pour les routes protégées
Authorization: Bearer TOKEN
Content-Type
Content-Type: application/json

⸻
👥 Rôles disponibles
• etudiant
• entreprise
• enseignant
• administrateur
⸻
🔑 1. AUTH
1.1 Register
POST /auth/register
Description
Créer un nouveau compte utilisateur.
Body
{
 "nom": "Sam",
 "email": "sam@test.com",
 "password": "123456",
 "role": "etudiant"
}
Réponse attendue
{
 "message": "Utilisateur créé avec succès.",
 "user": {
   "id": "ID_USER",
   "nom": "Sam",
   "email": "sam@test.com",
   "role": "etudiant"
 }
}
Remarques
• le rôle administrateur n’est pas destiné à être créé depuis l’interface publique
• il est généralement créé manuellement pour la démonstration
⸻
1.2 Login
POST /auth/login
Description
Connexion d’un utilisateur existant.
Body
{
 "email": "sam@test.com",
 "password": "123456"
}
Réponse attendue
{
 "message": "Connexion réussie.",
 "token": "JWT_TOKEN",
 "user": {
   "id": "ID_USER",
   "nom": "Sam",
   "email": "sam@test.com",
   "role": "etudiant"
 }
}

⸻
👤 2. USERS
2.1 Profil utilisateur
GET /users/profile
Description
Permet de récupérer le profil de l’utilisateur connecté.
Auth
✅ Oui
Réponse attendue
{
 "_id": "ID_USER",
 "nom": "Sam",
 "email": "sam@test.com",
 "role": "etudiant"
}

⸻
📄 3. OFFERS
3.1 Récupérer les offres disponibles
GET /offers
Description
Retourne la liste des offres visibles côté public / étudiant.
Auth
❌ Non
Règles métier
• seules les offres ouverte sont retournées
• une offre acceptée devient fermee et n’apparaît plus dans cette liste
Réponse attendue
{
 "message": "Liste des offres récupérée avec succès.",
 "count": 1,
 "offers": [
   {
     "_id": "ID_OFFER",
     "titre": "Stage - Support Informatique",
     "description": "Support et maintenance",
     "localisation": "Courbevoie",
     "statut": "ouverte",
     "entreprise": {
       "_id": "ID_ENTREPRISE",
       "nom": "Catalina",
       "email": "entreprise@test.com",
       "role": "entreprise"
     }
   }
 ]
}

⸻
3.2 Récupérer une offre par id
GET /offers/:id
Description
Retourne une offre précise.
Auth
❌ Non
Validation
• l’id doit être un ObjectId Mongo valide
Réponse attendue
{
 "message": "Offre récupérée avec succès.",
 "offer": {
   "_id": "ID_OFFER",
   "titre": "Stage - Support Informatique",
   "description": "Support et maintenance",
   "localisation": "Courbevoie",
   "statut": "ouverte"
 }
}

⸻
3.3 Créer une offre
POST /offers
Description
Créer une nouvelle offre de stage.
Auth
✅ Oui
Rôle autorisé
• entreprise
Body
{
 "titre": "Stage Développeur Web",
 "description": "Développement d’une plateforme de gestion de stages.",
 "localisation": "Paris",
 "statut": "ouverte"
}
Réponse attendue
{
 "message": "Offre créée avec succès.",
 "offer": {
   "_id": "ID_OFFER",
   "titre": "Stage Développeur Web",
   "description": "Développement d’une plateforme de gestion de stages.",
   "localisation": "Paris",
   "statut": "ouverte",
   "entreprise": "ID_ENTREPRISE"
 }
}

⸻
📨 4. APPLICATIONS
4.1 Voir les candidatures
GET /applications
Description
Retourne la liste des candidatures selon le rôle connecté.
Auth
✅ Oui
Comportement
• etudiant → voit ses candidatures
• entreprise → voit les candidatures reçues sur ses offres
• administrateur / autres → voient tout
Réponse attendue
{
 "message": "Liste des candidatures récupérée avec succès.",
 "count": 1,
 "applications": [
   {
     "_id": "ID_APPLICATION",
     "statut": "en_attente",
     "message": "Je suis intéressé par cette offre",
     "etudiant": {
       "_id": "ID_ETUDIANT",
       "nom": "Sam",
       "email": "sam@test.com",
       "role": "etudiant"
     },
     "offre": {
       "_id": "ID_OFFER",
       "titre": "Stage - Support Informatique",
       "entreprise": {
         "_id": "ID_ENTREPRISE",
         "nom": "Catalina",
         "email": "entreprise@test.com",
         "role": "entreprise"
       }
     }
   }
 ]
}

⸻
4.2 Postuler à une offre
POST /applications
Description
Créer une candidature sur une offre.
Auth
✅ Oui
Rôle autorisé
• etudiant
Body
{
 "offreId": "ID_OFFER",
 "message": "Bonjour, je souhaite postuler à cette offre."
}
Règles métier
• une candidature par étudiant et par offre
• impossible de postuler à une offre fermée
• l’offre doit exister
Réponse attendue
{
 "message": "Candidature envoyée avec succès.",
 "application": {
   "_id": "ID_APPLICATION",
   "etudiant": "ID_ETUDIANT",
   "offre": "ID_OFFER",
   "statut": "en_attente",
   "message": "Bonjour, je souhaite postuler à cette offre."
 }
}

⸻
4.3 Modifier le statut d’une candidature
PATCH /applications/:id/status
Description
Permet à l’entreprise de refuser ou accepter une candidature.
Auth
✅ Oui
Rôle autorisé
• entreprise
Body
{
 "status": "acceptee"
}
Valeurs possibles
• acceptee
• refusee
Règles métier
• seule l’entreprise propriétaire de l’offre peut modifier
• une candidature déjà traitée ne peut plus être modifiée
• si une candidature est acceptée :
• l’offre devient automatiquement fermee
Réponse attendue
{
 "message": "Statut de la candidature mis à jour avec succès.",
 "application": {
   "_id": "ID_APPLICATION",
   "statut": "acceptee"
 }
}

⸻
🏢 5. INTERNSHIPS
5.1 Voir les stages
GET /internships
Description
Retourne les stages visibles selon le rôle connecté.
Auth
✅ Oui
Comportement
• etudiant → voit ses stages
• entreprise → voit les stages liés à ses offres
• enseignant / administrateur → voient tous les stages
Réponse attendue
{
 "message": "Liste des stages récupérée avec succès.",
 "count": 1,
 "internships": [
   {
     "_id": "ID_INTERNSHIP",
     "etudiant": {
       "_id": "ID_ETUDIANT",
       "nom": "Sam",
       "email": "sam@test.com",
       "role": "etudiant"
     },
     "entreprise": {
       "_id": "ID_ENTREPRISE",
       "nom": "Catalina",
       "email": "entreprise@test.com",
       "role": "entreprise"
     },
     "offre": {
       "_id": "ID_OFFER",
       "titre": "Stage - Support Informatique",
       "description": "Support et maintenance",
       "localisation": "Courbevoie",
       "statut": "fermee"
     },
     "application": {
       "_id": "ID_APPLICATION",
       "statut": "acceptee",
       "message": "Je suis intéressé"
     },
     "dateDebut": "2026-03-23T00:00:00.000Z",
     "dateFin": "2026-03-24T00:00:00.000Z",
     "statut": "en_cours"
   }
 ]
}

⸻
5.2 Voir un stage précis
GET /internships/:id
Description
Retourne les détails d’un stage précis.
Auth
✅ Oui
Validation
• l’id doit être valide
• contrôle d’accès selon rôle
⸻
5.3 Créer un stage
POST /internships
Description
Créer un stage à partir d’une candidature acceptée.
Auth
✅ Oui
Rôle autorisé
• entreprise
Body
{
 "applicationId": "ID_APPLICATION",
 "dateDebut": "2026-04-01",
 "dateFin": "2026-08-31"
}
Règles métier
• la candidature doit être acceptee
• un seul stage par candidature
• dateDebut doit être antérieure à dateFin
Réponse attendue
{
 "message": "Stage créé avec succès.",
 "internship": {
   "_id": "ID_INTERNSHIP",
   "etudiant": "ID_ETUDIANT",
   "entreprise": "ID_ENTREPRISE",
   "offre": "ID_OFFER",
   "application": "ID_APPLICATION",
   "dateDebut": "2026-04-01T00:00:00.000Z",
   "dateFin": "2026-08-31T00:00:00.000Z",
   "statut": "en_cours"
 }
}

⸻
⭐ 6. EVALUATIONS
6.1 Voir les évaluations
GET /evaluations
Description
Retourne la liste des évaluations avec les données liées au stage, à l’étudiant, à l’entreprise et à l’offre.
Auth
✅ Oui
Réponse attendue
{
 "message": "Liste des évaluations récupérée avec succès.",
 "count": 1,
 "evaluations": [
   {
     "_id": "ID_EVALUATION",
     "internship": {
       "_id": "ID_INTERNSHIP",
       "etudiant": {
         "_id": "ID_ETUDIANT",
         "nom": "Sam",
         "email": "sam@test.com",
         "role": "etudiant"
       },
       "entreprise": {
         "_id": "ID_ENTREPRISE",
         "nom": "Catalina",
         "email": "entreprise@test.com",
         "role": "entreprise"
       },
       "offre": {
         "_id": "ID_OFFER",
         "titre": "Stage - Support Informatique",
         "localisation": "Courbevoie",
         "statut": "fermee"
       },
       "dateDebut": "2026-03-23T00:00:00.000Z",
       "dateFin": "2026-03-24T00:00:00.000Z",
       "statut": "en_cours"
     },
     "enseignant": {
       "_id": "ID_PROF",
       "nom": "Mr.Hammal",
       "email": "prof@test.com",
       "role": "enseignant"
     },
     "note": 15,
     "commentaire": "Très bon travail,"
   }
 ]
}

⸻
6.2 Voir une évaluation par id
GET /evaluations/:id
Description
Retourne une évaluation précise.
Auth
✅ Oui
Validation
• l’id doit être valide
⸻
6.3 Créer une évaluation
POST /evaluations
Description
Créer une évaluation liée à un stage.
Auth
✅ Oui
Rôle autorisé
• enseignant
• administrateur
Body
{
 "internshipId": "ID_INTERNSHIP",
 "note": 16,
 "commentaire": "Bon travail global, bonne implication et progression régulière."
}
Règles métier
• une seule évaluation par stage
• note comprise entre 0 et 20
• le stage doit exister
Réponse attendue
{
 "message": "Évaluation créée avec succès.",
 "evaluation": {
   "_id": "ID_EVALUATION",
   "internship": "ID_INTERNSHIP",
   "enseignant": "ID_PROF",
   "note": 16,
   "commentaire": "Bon travail global, bonne implication et progression régulière."
 }
}

⸻
🛠️ 7. ADMINISTRATION
7.1 Statistiques globales
GET /admin/stats
Description
Retourne les statistiques globales de la plateforme.
Auth
✅ Oui
Rôle autorisé
• administrateur
Réponse attendue
{
 "message": "Statistiques récupérées avec succès.",
 "stats": {
   "users": 4,
   "offers": 2,
   "applications": 3,
   "internships": 1,
   "evaluations": 1
 }
}

⸻
7.2 Réinitialiser la base
DELETE /admin/reset
Description
Supprime toutes les données de démonstration sauf les comptes administrateur.
Auth
✅ Oui
Rôle autorisé
• administrateur
Réponse attendue
{
 "message": "Base de données réinitialisée avec succès."
}

⸻
7.3 Récupérer toutes les ressources
Utilisateurs
GET /admin/users
Offres
GET /admin/offers
Candidatures
GET /admin/applications
Stages
GET /admin/internships
Évaluations
GET /admin/evaluations
Auth
✅ Oui
Rôle autorisé
• administrateur
⸻
7.4 Supprimer une ressource
Utilisateur
DELETE /admin/users/:id
Offre
DELETE /admin/offers/:id
Candidature
DELETE /admin/applications/:id
Stage
DELETE /admin/internships/:id
Évaluation
DELETE /admin/evaluations/:id
Auth
✅ Oui
Rôle autorisé
• administrateur
Remarque
• un administrateur ne peut pas se supprimer lui-même via cette route si vous bloquez la suppression des admins
⸻
❤️ 8. HEALTHCHECK
Vérification API
GET /health
Description
Permet de vérifier rapidement que l’API fonctionne.
Auth
❌ Non
Réponse attendue
{
 "status": "API running"
}

⸻
⚠️ 9. Gestion des erreurs
Types d’erreurs gérées
• identifiant invalide
• ressource introuvable
• accès interdit
• token invalide
• route inexistante
• conflit métier
• erreur serveur
Exemples
400 — Mauvaise requête
{
 "message": "Identifiant d'offre invalide."
}
401 — Authentification invalide
{
 "message": "Token invalide."
}
403 — Accès refusé
{
 "message": "Vous n'êtes pas autorisé à modifier cette candidature."
}
404 — Introuvable
{
 "message": "Offre introuvable."
}
409 — Conflit métier
{
 "message": "Vous avez déjà postulé à cette offre."
}
500 — Erreur serveur
{
 "message": "Erreur serveur lors de la récupération des évaluations.",
 "error": "détail technique"
}

⸻
🧠 10. Logique métier globale
Workflow principal
1. Une entreprise crée une offre
2. Un étudiant consulte les offres ouvertes
3. L’étudiant candidate
4. L’entreprise accepte ou refuse
5. Si acceptée :
• l’offre passe en fermee
• un stage peut être créé
6. L’enseignant crée une évaluation
7. L’étudiant peut consulter son évaluation
⸻
📦 11. Technologies utilisées
• Frontend : React + Vite
• Backend : Node.js + Express
• Base de données : MongoDB + Mongoose
• Déploiement local : Docker + Docker Compose
• Reverse proxy : Nginx
⸻
✅ 12. État du projet
Fonctionnalités implémentées
• Authentification JWT
• Gestion des rôles
• Gestion des offres
• Gestion des candidatures
• Gestion des stages
• Gestion des évaluations
• Interface admin
• Validation métier
• Gestion des erreurs
• Frontend par rôle
État final
🚀 API prête et connectée au frontend
