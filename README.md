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

### Installation de Sqitch

Sous Linux

- Installation

    ```bash
      sudo apt-get update
      sudo apt-get install sqitch

      sqitch --version

      sqitch config --user user.name 'John Doe'
      sqitch config --user user.email 'john@doe.org'
    ```

- Vérifier et configurer l'installation de sqitch

  ```bash
    sqitch --version
    sqitch config --user user.email 'john.doe@gmail.com'
    sqitch config --get user.email
  ```

### Installation de Redis

Sous Linux

- Installation

  ```bash
  sudo apt-get update
  sudo apt-get install redis-server
  ```

- Lancer le server

  ```bash
  redis-server
  ```

- Tester le fonctionnement

  ```bash
  127.0.0.1:6397> ping
  PONG

  127.0.0.1:6397> set test "OK!"
  127.0.0.1:6397> get test
  "OK!"
  127.0.0.1:6397> del test
  ```

- Configurer Redis (mettre un mot de passe)

  ```bash
  127.0.0.1:6397> config set requirepass "password"
  OK
  ```

## Implémentation des données

- Créer la BDD

  ```bash
    sudo -i -u postgres psql

    CREATE DATABASE oworld OWNER oworld
    :\q
  ```
  
- Créer les fichier .env et sqitch.conf à la racine du projet à l'aide des exemples
  
  sqitch.conf

  ```bash
  [core]
  engine = pg
  top_dir = migrations
  plan_file = migrations/sqitch.plan
  [engine "pg"]
  target = db:pg://user:password@server:5432/nameDataBase
  registry = sqitch
  client = psql
  ```

  .env

  ```bash
  # HTTP server port
  PORT=BalanceTonPort

  # Database 
  ## Postgres
  PGPORT=
  PGHOST=
  PGDATABASE=
  PGUSER=
  PGPASSWORD=

  ## Redis
  REDIS_HOST=
  REDIS_PORT=
  REDIS_PASSWORD=

  # CORS
  CORS_DOMAINS=

  #Session configuration
  SESSION_SECRET=

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
  