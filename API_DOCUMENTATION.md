# 🚀 API Documentation — Plateforme de Gestion de Stages

---

## 🌐 Base URL

### Local
\`\`\`
http://localhost/api
\`\`\`

### Accès externe
\`\`\`
http://79.137.35.83/api
\`\`\`

---

## 📌 Présentation générale

Cette API permet de gérer l’ensemble du cycle de vie d’un stage :

- création d’offres par une entreprise  
- candidature d’un étudiant  
- validation ou refus par l’entreprise  
- création d’un stage  
- évaluation par un enseignant  
- supervision globale par un administrateur  

✔️ API REST  
✔️ Authentification JWT  

---

## 🔐 Authentification

### Headers
\`\`\`
Authorization: Bearer TOKEN
Content-Type: application/json
\`\`\`

---

## 👥 Rôles disponibles

- etudiant  
- entreprise  
- enseignant  
- administrateur  

---

# 🔑 1. AUTH

## 1.1 ➤ Register  
**POST /auth/register**

### Body
\`\`\`json
{
  "nom": "Sam",
  "email": "sam@test.com",
  "password": "123456",
  "role": "etudiant"
}
\`\`\`

### Réponse
\`\`\`json
{
  "message": "Utilisateur créé avec succès.",
  "user": {
    "id": "ID_USER",
    "nom": "Sam",
    "email": "sam@test.com",
    "role": "etudiant"
  }
}
\`\`\`

---

## 1.2 ➤ Login  
**POST /auth/login**

### Body
\`\`\`json
{
  "email": "sam@test.com",
  "password": "123456"
}
\`\`\`

### Réponse
\`\`\`json
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
\`\`\`

---

# 👤 2. USERS

## 2.1 ➤ Profil utilisateur  
**GET /users/profile**

### Réponse
\`\`\`json
{
  "_id": "ID_USER",
  "nom": "Sam",
  "email": "sam@test.com",
  "role": "etudiant"
}
\`\`\`

---

# 📄 3. OFFERS

## 3.1 ➤ Liste des offres  
**GET /offers**

### Réponse
\`\`\`json
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
\`\`\`

---

## 3.2 ➤ Une offre par ID  
**GET /offers/:id**

### Réponse
\`\`\`json
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
\`\`\`

---

## 3.3 ➤ Créer une offre  
**POST /offers**

### Body
\`\`\`json
{
 "titre": "Stage Développeur Web",
 "description": "Développement d’une plateforme de gestion de stages.",
 "localisation": "Paris",
 "statut": "ouverte"
}
\`\`\`

---

# 📨 4. APPLICATIONS

## 4.1 ➤ Voir les candidatures  
**GET /applications**

### Réponse
\`\`\`json
{
 "message": "Liste des candidatures récupérée avec succès.",
 "count": 1,
 "applications": [...]
}
\`\`\`

---

## 4.2 ➤ Postuler  
**POST /applications**

### Body
\`\`\`json
{
 "offreId": "ID_OFFER",
 "message": "Bonjour, je souhaite postuler à cette offre."
}
\`\`\`

---

## 4.3 ➤ Modifier une candidature  
**PATCH /applications/:id/status**

### Body
\`\`\`json
{
 "status": "acceptee"
}
\`\`\`

---

# 🏢 5. INTERNSHIPS

## 5.1 ➤ Voir les stages  
**GET /internships**

### Réponse
\`\`\`json
{
 "message": "Liste des stages récupérée avec succès.",
 "count": 1,
 "internships": [...]
}
\`\`\`

---

## 5.2 ➤ Voir un stage  
**GET /internships/:id**

---

## 5.3 ➤ Créer un stage  
**POST /internships**

### Body
\`\`\`json
{
 "applicationId": "ID_APPLICATION",
 "dateDebut": "2026-04-01",
 "dateFin": "2026-08-31"
}
\`\`\`

---

# ⭐ 6. EVALUATIONS

## 6.1 ➤ Liste des évaluations  
**GET /evaluations**

---

## 6.2 ➤ Une évaluation  
**GET /evaluations/:id**

---

## 6.3 ➤ Créer une évaluation  
**POST /evaluations**

### Body
\`\`\`json
{
 "internshipId": "ID_INTERNSHIP",
 "note": 16,
 "commentaire": "Bon travail global."
}
\`\`\`

---

# 🛠️ 7. ADMINISTRATION

### Routes admin
- GET /admin/stats  
- DELETE /admin/reset  
- GET /admin/users  
- GET /admin/offers  
- GET /admin/applications  
- GET /admin/internships  
- GET /admin/evaluations  
- DELETE /admin/users/:id  
- DELETE /admin/offers/:id  
- DELETE /admin/applications/:id  
- DELETE /admin/internships/:id  
- DELETE /admin/evaluations/:id  

---

# ❤️ 8. HEALTHCHECK

\`\`\`json
{ "status": "API running" }
\`\`\`

---

# ⚠️ 9. Gestion des erreurs

### 400
\`\`\`json
{ "message": "Identifiant d'offre invalide." }
\`\`\`

### 401
\`\`\`json
{ "message": "Token invalide." }
\`\`\`

### 403
\`\`\`json
{ "message": "Accès refusé." }
\`\`\`

### 404
\`\`\`json
{ "message": "Offre introuvable." }
\`\`\`

### 409
\`\`\`json
{ "message": "Vous avez déjà postulé à cette offre." }
\`\`\`

### 500
\`\`\`json
{
 "message": "Erreur serveur.",
 "error": "détail technique"
}
\`\`\`

---

# 🧠 10. Workflow métier global

1. Création de l’offre  
2. Consultation  
3. Candidature  
4. Acceptation/refus  
5. Fermeture + stage  
6. Évaluation  
7. Consultation étudiant  

---

# 📦 11. Technologies
- React + Vite  
- Node.js + Express  
- MongoDB + Mongoose  
- Docker + Docker Compose  
- Nginx  

---

# ✅ 12. État du projet  
API 100 % connectée & fonctionnelle  
\`\`\`
