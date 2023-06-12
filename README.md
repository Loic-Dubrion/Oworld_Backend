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

- Vérifier et configurer l'installation de sqitch

  ```bash
    sqitch --version
    sqitch config --user user.email 'john.doe@gmail.com'
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

<details >
<summary>Sous Windows</summary>

- Téléchargez la dernière version stable de Redis pour Windows à partir du site officiel de Redis (<https://redis.io/download>).
  
  Option 1
- Extrayez les fichiers de l'archive téléchargée dans un répertoire de votre choix, par exemple C:\Redis.
- Ouvrez une fenêtre de commande en tant qu'administrateur.
- Accédez au répertoire dans lequel vous avez extrait les fichiers Redis à l'aide de la commande cd, par exemple cd C:\Redis.
- Exécutez le fichier redis-server.exe pour démarrer le serveur Redis. Vous pouvez le faire en utilisant la commande redis-server.
- Redis devrait maintenant être en cours d'exécution sur votre machine Windows.

  Option 2
Vous pouvez également exécuter Redis en tant que service Windows en suivant ces étapes supplémentaires :

- Dans une fenêtre de commande en tant qu'administrateur, accédez au répertoire Redis (par exemple C:\Redis).
- Exécutez la commande suivante pour installer Redis en tant que service Windows :

```bash
redis-server --service-install
```

Une fois l'installation terminée, vous pouvez démarrer le service Redis en utilisant la commande suivante :

```bash
redis-server --service-start
```

Vous pouvez également arrêter le service Redis en utilisant la commande suivante :

```bash
redis-server --service-stop
```

</details>

Lancer et tester le serveur

- Lancer le serveur

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

- Créer les tables et insérer les données (modifiez les script en fonction de votre environnement)

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
  