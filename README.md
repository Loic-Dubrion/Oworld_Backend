# projet-05-o-world-back
Création d'une api pour le site O'world.
Le server back possède deux bases de données, une relationnelle PostgresSql pour les données utilisateurs ( gestion des rôles et permissions, favoris, données personnelles) et une noSql avec Redis pour la gestion des caches (mise en cache des données issues d'api externe).
Il est réalisé en NodeJs avec Express, un fichier "feakers" permet l'insertion de données fictives pour faciliter la phase de développement et une documentation est disponible (Swagger et JsDoc).

## Installation

- Cloner le projet

  ```bash
    git clone git@github.com:O-clock-Starship/projet-05-o-world-back.git
  ```

- Initialiser le projet
  Installation de toutes les dépendances

  ```bash
    npm install
  ```

### Installation de Sqitch

<details>
<summary>Sous Linux</summary>

- Installation

    ```bash
      sudo apt-get update
      sudo apt-get install sqitch

      sqitch --version

      sqitch config --user user.name 'John Doe'
      sqitch config --user user.email 'john@doe.org'
    ```

- Vérifier

  ```bash
    sqitch --version
    sqitch config --get user.name
    sqitch config --get user.email
  ```

</details>

### Installation de Redis

<details>
<summary>Sous Linux</summary>

- Installation

  ```bash
  sudo apt-get update
  sudo apt-get install redis-server
  ```

</details>

Lancer et tester le serveur

- Lancer le serveur

  ```bash
  redis-server
  ```

- Tester le fonctionnement

  ```bash
  redis-cli

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

    CREATE USER oworld WITH PASSWORD myPassword
    CREATE DATABASE oworld OWNER oworld
    
    :\q
  ```
  
- Créer les fichier .env et sqitch.conf à la racine du projet à l'aide des exemples

- Créer les tables et insérer les données
**! modifiez les script en fonction de votre environnement !**
**"psql -U <user> -d <myDataBase> -f data/seedingCountry.sql"**

  ```bash
    sqitch deploy
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
  
## Lancer les test

  ```bash
    jest
  ```

## Accéder à la documentaion

La documentation swagger est directement accessible sur <https://projet-05-o-world-back-production.up.railway.app/api-docs/>

Pour créer et accéder à la documentaion générale

  ```bash
    npm run docs
  ```

puis accéder via la route /api/docs.
