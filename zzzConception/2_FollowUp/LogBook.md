# Logbook Loïc

## 31/05/2023 - J01 - Sprint 0

- Presentation of the project
- Choice of technologies

## 01/06/2023 - J02 - Sprint 0

- Conception MCD, MLD and MPD
- Rest Country Api test:
  - query format, parameters, filters
- OECD api research => sdmx-json return format
  
## 02/06/2023 - J03 - Sprint 0

- Modification MCD, MLD and MPD
- World Bank Api test:
  - query format, parameters, filters
- Add back road on the CAC

## 05/06/2023 - J04 - Sprint 0

- init project
- install dependencies
- configuration work environment
- create database
- init sqitch (first migration)
- seeding database
- script seeding and deploy
- management errors
- models external api and test

## 06/06/2023 - J05 - Sprint 0

- create view sql for admin statistique
- creating tests for models
- create model for external api request
- create route admin and visitor with controller et datamapper
- installation of cors
- create function sql for profil page
- generate doc with jsDoc
- creation of the readMe with indications for the front

## 07/06/2023 - J06 - Sprint 0

- add table for earth data
- create view for earth data
- create view for country list
- create function sql for favorite management
- Installation Joi and BCrypt
- function sql for create , update and delete user

## 08/06/2023 - J01 - Sprint 1

- router for create, update and delete user
- login and logout user
- install express-session, body-sanitizer
- authentication basis with session
- management errors for create, update and delete user
- test added on admin and log routes

## 09/06/2023 - J02 - Sprint 1

- route for get all flags
- security:
  - managing routes according to roles and permissions (RBAC)
  - authentication basis with session (express-session)
  - management errors
  - setting up a manual backup of the database (pg_dump)
  - setting up a logging system (Bunyan)
  - cache: memoïzation of certain external api requests

## 12/06/2023 - J03 - Sprint 1

- Clean code
- Vérification de sécurité
- Documentation

## 13/06/2023 - J04 - Sprint 1

- mise en ligne sur Railway
- debug railway
  - compatibilité fetch
  - connexion Redis (revu du client connexion)

## 14/06/2023 - J05 - Sprint 1

- correction bug
- add a route wtf

## 15/06/2023 - J01 - Sprint 2

- search doc for Token
- test token and token refresh

## 16/06/2023 - J02 - sprint 2

- Correction des bug JWT
- Recherche nodeMailer et Brevo

## 19/06/2023 - J03 - sprint 2

- Mise en place de nodeMailer
- Création d'une route reset-password
- Création d'un compte Brevo
- Envoye des log et de la sauvegarde de la BDD par mail

## 20/06/2023 - J04 - sprint 2

- Mise en place de prom-client
- Suivi de la santé du serveur
- Correction de bug
- Reset de la bdd en ligne
- Création des RGPD

## 21/06/2023 - J05 - sprint 2

- Presentation of Sprint 2
- Retirement of Prometheus
- Additional unit testing on routes with Jest
- Security: Joi validator added

## 22/06/2023 - J01 - sprint 3

- Front-end deployment on Railway
- Creation of a restore function from the DB backup
- Clean Code Back
