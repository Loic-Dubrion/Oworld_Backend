# Routes

## Admin

GET /api/admin/stats

- Tous les pays d'origines des utilisateurs
- Le nombre d'utilisateur par classe d'âge
- Le nombre d'utilisateur par pays d'origine
- Le nombre d'utilisateur total
- Le nombre de pins par pays
- Le nombre de d'utilisateur pour chaque pays visités

## Visitors

GET /api/oworld/
- Un objet de tous les pays (id, iso, name)
GET /api/oworld/:countryID
- Un objet avec détail d'un pays (api rest Country)

## Users

GET /api/oworld/:UserID

- Tous les pays (id, iso, name)
- Les pays favoris (id, iso, name)

GET /api/oworld/:UserID/:countryID

- Objet avec détail d'un pays ( catégories api rest world bank)
- Les pays favoris
- % de pays favoris vs total

POST /api/oworld/logIn
POST /api/oworld/logOut
POST /api/oworld/subscribe

PUT /api/oworld/:UserID/

- Modifier le profil
- Modifier les pays pin

DELETE /api/oworld/:UserID
