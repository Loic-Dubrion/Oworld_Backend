# projet-05-o-world-back

## Installation

- Cloner le projet

  ```bash
    git clone git@github.com:O-clock-Starship/projet-05-o-world-back.git
  ```

- Initialiser le projet
  Installation de toutes les dépendances

  ```bash
    npm init
  ```

- Installation de Sqitch
  Sous Linux

  ```bash
    sudo apt-get update
    sudo apt-get install sqitch

    sqitch --version

    sqitch config --user user.name 'John Doe'
    sqitch config --user user.email 'john@doe.org'
  ```

  Vérifier l'installation

  ```bash
    sqitch --version
    sqitch config --user user.email 'john.doe@gmail.com'
    sqitch config --get user.email
  ```

## Implémentation des données

- Créer la BDD

  ```bash
    sudo -i -u postgres psql

    CREATE DATABASE oworld OWNER oworld
    :\q
  ```
  
- Créer les fichier .env et sqitch.conf à la racine du projet à l'aide des exemple
sqitch.conf

  ```bash
  [core]
  engine = pg
  top_dir = migrations
  # plan_file = migrations/sqitch.plan
  [engine "pg"]
  target = db:pg:user:password@server:port/nameDataBase
  # registry = sqitch
  # client = psql
  ```

.env

```bash
  # HTTP server port
  PORT=

  # Database
  PGPORT=
  PGHOST=
  PGDATABASE=
  PGUSER=
  PGPASSWORD=

  # CORS
  CORS_DOMAINS=http://localhost:3000

  # Environment
  NODE_ENV=development

  # Docs
  API_DOCUMENTATION_ROUTE=/docs
```

- Créer les tables et insérer les données

  ```bash
    npm run db:create
    npm run db:seed
  ```

## Lancer l'application

### En développement

  ```bash
    npm run dev
  ```

### En production

  ```bash
    npm run start
  ```
  