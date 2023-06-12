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

    CREATE DATABASE oworld OWNER oworld
    :\q
  ```
  
- Créer les fichier .env et sqitch.conf à la racine du projet à l'aide des exemples

- Créer les tables et insérer les données ( ! modifiez les script en fonction de votre environnement !)

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
  