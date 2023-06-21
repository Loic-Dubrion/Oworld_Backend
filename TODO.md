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
  - [X] External API
  - [X] Admin
  - [ ] User
  - [X] Oworld

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
  - [X] Schedule the backup to be sent by email
- [X] Clean code and add comment
- [X] Cache management
- [X] Monitoring on external request
- [X] JWT
- [X] Deployment

## Finishes

- [X] Prevent insertion of a null value in favourites
- [X] Prevent duplicates from being inserted into bookmarks too
- [X] Modify the return values of the bookmark insertion and deletion functions
- [X] Switch planet table to redis
- [X] Refacto redis
- [X] Refacto Jwt
- [X] Check JSDoc and Swagger
