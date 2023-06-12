# TODO List

## Sprint O - Conception

- [X] MCD
- [X] MLD
- [X] MPD
- [X] Test external API
  - [X] RestCountry
  - [X] WorldBank
  - [X] RadioBrowser
- [X] Init Project
- [X] Install dependencies
- [X] Configuration work environment
- [X] Init sqitch
- [X] Create database
- [X] Seeding database
  - [X] Fakers
  - [X] script seeding and deploy

## Sprint 1 - MVP

- [X] Create server
- [X] Create CoreController
- [X] Create CoreDataMapper
- [X] Create Class Error
- [X] Create controllerHandler
- [X] Create apiHandler

- [X] Create Views and Functions SQL
- [X] Create models
- [X] Test all models
  - [X] External API
  - [ ] Admin
  - [ ] User
  - [ ] Oworld
- [X] Create all controllers
  - [X] External API
  - [X] Admin
  - [X] User
  - [X] Session
  - [X] Oworld
- [X] Create all routers
  - [X] External API
  - [X] Admin
  - [X] User
  - [X] Log
  - [X] Oworld
- [X] Test all routes
  - [ ] External API
  - [X] Admin
  - [ ] User
  - [ ] Oworld

- [X] Create doc with Swagger and JSDoc

## Sprint 2 - Security

- [X] Error Management
- [X] Role management (RBAC)
- [X] Bcrypt
- [X] Regex on url params
- [X] Sanitizer
- [X] Validate with Joi
- [X] Setting up logging (Bunyan)
- [X] Setting up a backup of the database
- [ ] Clean code and add comment
- [ ] Cache management
- [ ] Timer on external request
- [ ] JWT
- [ ] Deployment

## Finitions

- [ ] Empêcher l'insertion d'une valeur null dans les favoris
Test avec la query HON insert des valeurs null
- [ ] Emêcher également l'insertion des doublons dans les favoris
- [X] Modifier les valeurs de retour des fonction d'insertion et de suppression de favoris
- [ ] Faire une bdd dans les règles pour les planètes du système solaire
  - [ ] Ajout d'une table planet
  - [ ] Ajout d'une table lune
  - [ ] Ajout des clef étrangères
