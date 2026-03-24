# 🚀 API Documentation - Plateforme de Gestion de Stages
---
## 🌐 Base URL
### Local (VPS)
\`\`\`bash
http://localhost/api
Accès externe
http://79.137.35.83/api
\`\`\`

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

⸻
1.2 Login  
POST /auth/login  

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

Réponse attendue  
{
 "_id": "ID_USER",
 "nom": "Sam",
 "email": "sam@test.com",
 "role": "etudiant"
}

⸻
📄 3. OFFERS  

3.1 Récupérer les offres  
GET /offers  

Réponse attendue  
{
 "message": "Liste des offres récupérée avec succès.",
 "count": 1,
 "offers": [...]
}

⸻
3.2 Récupérer une offre  
GET /offers/:id  

Réponse attendue  
{
 "message": "Offre récupérée avec succès.",
 "offer": {...}
}

⸻
3.3 Créer une offre  
POST /offers  

Body  
{
 "titre": "Stage Développeur Web",
 "description": "Développement d’une plateforme...",
 "localisation": "Paris",
 "statut": "ouverte"
}

⸻
📨 4. APPLICATIONS  

4.1 Voir les candidatures  
GET /applications  

Réponse attendue  
{
 "message": "Liste des candidatures récupérée...",
 "applications": [...]
}

⸻
4.2 Postuler  
POST /applications  

Body  
{
 "offreId": "ID_OFFER",
 "message": "Bonjour..."
}

⸻
4.3 Modifier le statut  
PATCH /applications/:id/status  

Body  
{ "status": "acceptee" }

⸻
🏢 5. INTERNSHIPS  

5.1 Voir les stages  
GET /internships  

Réponse attendue  
{
 "message": "Liste des stages récupérée...",
 "internships": [...]
}

⸻
5.2 Voir un stage  
GET /internships/:id  

⸻
5.3 Créer un stage  
POST /internships  

Body  
{
 "applicationId": "ID_APPLICATION",
 "dateDebut": "2026-04-01",
 "dateFin": "2026-08-31"
}

⸻
⭐ 6. EVALUATIONS  

6.1 Voir les évaluations  
GET /evaluations  

⸻
6.2 Voir une évaluation  
GET /evaluations/:id  

⸻
6.3 Créer une évaluation  
POST /evaluations  

Body  
{
 "internshipId": "ID_INTERNSHIP",
 "note": 16,
 "commentaire": "Bon travail..."
}

⸻
🛠️ 7. ADMINISTRATION  

7.1 Stats  
GET /admin/stats  

7.2 Reset  
DELETE /admin/reset  

7.3 Récupérer ressources  
GET /admin/users  
GET /admin/offers  
GET /admin/applications  
GET /admin/internships  
GET /admin/evaluations  

7.4 Supprimer ressource  
DELETE /admin/users/:id  
DELETE /admin/offers/:id  
DELETE /admin/applications/:id  
DELETE /admin/internships/:id  
DELETE /admin/evaluations/:id  

⸻
❤️ 8. HEALTHCHECK  
GET /health  

Réponse :  
{ "status": "API running" }

⸻
⚠️ 9. Gestion des erreurs  
400 { "message": "Identifiant invalide." }  
401 { "message": "Token invalide." }  
403 { "message": "Accès refusé." }  
404 { "message": "Introuvable." }  
409 { "message": "Déjà postulé." }  
500 { "message": "Erreur serveur." }  

⸻
🧠 10. Workflow global  
1. Offre  
2. Consultation  
3. Candidature  
4. Acceptation  
5. Stage  
6. Évaluation  
7. Consultation étudiant  

⸻
📦 11. Technologies  
React, Node.js, Express, MongoDB, Docker, Nginx  

⸻
✅ 12. État du projet  
API fonctionnelle & reliée au frontend  

