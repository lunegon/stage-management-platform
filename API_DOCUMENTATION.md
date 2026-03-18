# 🚀 API Documentation - Plateforme de Gestion de Stages

---

## 🌐 Base URL

### Local (VPS)
```

[http://localhost/api](http://localhost/api)

```

### Accès externe
```

[http://79.137.35.83/api](http://79.137.35.83/api)

````

---

# 🔐 1. AUTHENTIFICATION

## ➜ Register
**POST** `/auth/register`

### Body
```json
{
  "nom": "Sam",
  "email": "sam@test.com",
  "password": "123456",
  "role": "etudiant"
}
````

### Rôles possibles

* etudiant
* entreprise
* enseignant
* administrateur

---

## ➜ Login

**POST** `/auth/login`

### Body

```json
{
  "email": "sam@test.com",
  "password": "123456"
}
```

### Réponse

```json
{
  "message": "Connexion réussie",
  "token": "JWT_TOKEN",
  "user": {
    "id": "...",
    "nom": "...",
    "email": "...",
    "role": "..."
  }
}
```

---

# 👤 2. USERS

## ➜ Profil utilisateur

**GET** `/users/profile`

### Auth

✅ Obligatoire

### Header

```
Authorization: Bearer TOKEN
```

---

# 📄 3. OFFRES

## ➜ Récupérer toutes les offres

**GET** `/offers`

### Auth

❌ Non

---

## ➜ Récupérer une offre

**GET** `/offers/:id`

### Validation

* Vérifie si l’ID est valide
* Retourne erreur si invalide

---

## ➜ Créer une offre

**POST** `/offers`

### Auth

✅ Oui

### Rôle

* entreprise uniquement

### Body

```json
{
  "titre": "Stage Développeur Web",
  "description": "Développement d’une plateforme",
  "localisation": "Paris",
  "statut": "ouverte"
}
```

---

# 📩 4. CANDIDATURES (APPLICATIONS)

## ➜ Voir les candidatures

**GET** `/applications`

### Auth

✅ Oui

### Comportement

* étudiant → ses candidatures
* entreprise → candidatures reçues
* admin → tout

---

## ➜ Postuler à une offre

**POST** `/applications`

### Auth

✅ Oui

### Rôle

* étudiant uniquement

### Body

```json
{
  "offreId": "ID_OFFRE",
  "message": "Je suis intéressé par cette offre"
}
```

### Règles métier

* ❌ Pas de double candidature
* ❌ Offre doit être ouverte

---

## ➜ Modifier statut candidature

**PATCH** `/applications/:id/status`

### Auth

✅ Oui

### Rôle

* entreprise uniquement

### Body

```json
{
  "status": "acceptee"
}
```

### Valeurs

* acceptee
* refusee

### Règles métier

* entreprise propriétaire uniquement
* candidature déjà traitée → bloquée

---

# 🎓 5. STAGES (INTERNSHIPS)

## ➜ Voir les stages

**GET** `/internships`

### Auth

✅ Oui

### Comportement

* étudiant → ses stages
* entreprise → ses stages
* admin → tous

---

## ➜ Voir un stage

**GET** `/internships/:id`

### Validation

* vérifie ID Mongo
* vérifie accès utilisateur

---

## ➜ Créer un stage

**POST** `/internships`

### Auth

✅ Oui

### Rôle

* entreprise

### Body

```json
{
  "applicationId": "ID_CANDIDATURE",
  "dateDebut": "2026-04-01",
  "dateFin": "2026-08-31"
}
```

### Règles métier

* candidature doit être **acceptée**
* ❌ un seul stage par candidature
* dateDebut < dateFin

---

# 📝 6. EVALUATIONS

## ➜ Voir les évaluations

**GET** `/evaluations`

### Auth

✅ Oui

---

## ➜ Voir une évaluation

**GET** `/evaluations/:id`

---

## ➜ Créer une évaluation

**POST** `/evaluations`

### Auth

✅ Oui

### Rôle

* enseignant
* administrateur

### Body

```json
{
  "internshipId": "ID_STAGE",
  "note": 16,
  "commentaire": "Très bon travail"
}
```

### Règles métier

* ❌ 1 seule évaluation par stage
* note entre 0 et 20

---

# ❤️ 7. HEALTHCHECK

## ➜ Vérifier API

**GET** `/health`

### Réponse

```json
{
  "status": "API running"
}
```

---

# ⚠️ 8. GESTION DES ERREURS

## Types d’erreurs gérées

### 🔴 400 — Mauvaise requête

```json
{
  "message": "Identifiant invalide"
}
```

---

### 🔴 401 — Non authentifié

```json
{
  "message": "Token manquant ou invalide"
}
```

---

### 🔴 403 — Interdit

```json
{
  "message": "Accès refusé"
}
```

---

### 🔴 404 — Introuvable

```json
{
  "message": "Ressource introuvable"
}
```

---

### 🔴 500 — Erreur serveur

```json
{
  "message": "Erreur serveur",
  "error": "détail"
}
```

---

# 📌 9. HEADERS UTILISÉS

### Authentification

```
Authorization: Bearer TOKEN
```

### Content-Type

```
Content-Type: application/json
```

---

# 🧠 10. LOGIQUE GLOBALE

### Workflow complet

1. User se connecte → reçoit token
2. Entreprise crée une offre
3. Étudiant postule
4. Entreprise accepte candidature
5. Création stage
6. Prof évalue stage

---

# 📦 11. STACK TECHNIQUE

* Node.js (Express)
* MongoDB (Mongoose)
* Docker (multi containers)
* Nginx (reverse proxy)
* React (frontend à venir)

---

# ✅ API READY

✔ Auth fonctionnelle
✔ CRUD complet
✔ Sécurité JWT
✔ Validation avancée
✔ Règles métier
✔ Architecture propre

---
