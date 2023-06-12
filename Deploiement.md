# ReadMe - Déploiement du serveur by Amhed

Ce ReadMe contient les instructions pour déployer votre serveur sur la plateforme Cloud de Kourou. Veuillez suivre attentivement les étapes ci-dessous.

## Connexion


1. Connectez-vous à Kourou et accédez à l'onglet Ressources.
2. Cliquez sur "Gestion Serveur Cloud".
3. Choisissez "Démarrer la VM" (cela peut prendre un certain temps).
4. La VM est lancée lorsque le bouton "Arrêter la VM" devient violet.
5. **IMPORTANT** : Une fois la VM lancée, assurez-vous de la rendre publique en cliquant sur le bouton "RENDRE LA VM PUBLIC". Il est possible que le bouton ne change pas de couleur immédiatement, mais la confirmation que la VM est publique est que le bouton "RENDRE LA VM PRIVEE" devienne violet.
6.  "Pour se connecter en SSH, il faut le faire depuis la machine où est lancée kourou"
7. Copiez la commande `ssh` pour vous connecter à la VM et collez-la dans votre terminal, puis appuyez sur "Entrée".
8. Un message s'affiche avec les informations concernant votre machine, et le nom affiché devrait être "student@votre_nom-server:~$".

## Mise à jour

- **Ubuntu** :

```bash
sudo apt install && sudo apt upgrade
```

Cette opération peut prendre du temps.

### Installation et dépendances

### NGINX

Nous utiliserons NGINX comme serveur web et proxy reverse vers notre serveur Node.js.

```bash
sudo apt install nginx
```

### CERTBOT

Certbot nous permettra de créer un certificat SSL pour notre serveur, afin de chiffrer les données entrantes.

```bash
sudo apt install certbot python3-certbot-nginx
```

Une fois cette étape terminée, nous allons demander un certificat pour notre VM. Vous devez entrer l'URL de votre VM Cloud sans "http://" (par exemple, `qwikle-server.eddi.cloud`).

```bash
sudo certbot --nginx -d qwikle-server.eddi.cloud
```

Répondez aux questions posées par Certbot et fournissez une adresse e-mail. Si toutes les étapes précédentes ont été correctement appliquées, vous devriez obtenir un certificat valide. Lorsque Certbot vous demande si vous souhaitez rediriger tout le trafic du port 80 vers le port 443, acceptez.

Vérifiez que PostgreSQL et Node.js sont installés en exécutant les commandes suivantes :

- **NODEJS** :

```bash
node -v
```

Si Node.js est installé, vous pouvez mettre à jour vers la dernière version de npm.

```bash
sudo npm install -g npm@latest
```

- **POSTGRESQL** :

```bash
psql -V
```

Si l'une des deux commandes renvoie "command not found", cela signifie que `node` ou `psql` n'est pas installé sur votre ordinateur.

### Installation (si absent de la VM)

- **Node.js** :

```bash
wget -qO- https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

Ensuite, mettez à jour npm vers la dernière version :

```bash
sudo npm install -g npm@latest
```

- **POSTGRESQL** :

```bash
sudo apt install

 postgresql
```

### Création d'un rôle et d'une base de données

Vous connaissez déjà cette étape, mais un rappel ne fait jamais de mal :

```bash
sudo -i -u postgres psql
```

```sql
CREATE ROLE "mon_user" WITH LOGIN PASSWORD 'mon_super_password';
```

```sql
CREATE DATABASE "ma_base_de_donnees" OWNER "mon_user";
```

### GIT

Si vous étiez en mode "popcorn", mettez en place votre clé SSH Git. Remplacez "your_email@example.com" par votre adresse e-mail GitHub.

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Appuyez sur "Entrée" lorsque cela vous est demandé, puis sur "yes" jusqu'à la fin pour générer une clé (aucun mot de passe n'est requis).

Une fois la clé générée, vous devez la récupérer pour l'enregistrer dans GitHub.

```bash
nano ~/.ssh/id_ed25519.pub
```

Vous accéderez à l'éditeur de texte "nano" (agrandissez votre terminal pour voir la clé en entier). Copiez tout le contenu.

Utilisez la combinaison de touches "CTRL + X" pour quitter nano.

Dans votre navigateur, rendez-vous sur GitHub, puis accédez à "profil" => "settings" => "SSH AND GPG keys" => "New SSH key".

Donnez un nom à votre clé SSH et collez votre clé, puis enregistrez.

À partir de maintenant, vous pouvez cloner vos projets sur votre VM.

### SQITCH (optionnel)

```bash
sudo apt install sqitch libdbd-pg-perl postgresql-client
```

## Installation de PM2

PM2 permet à votre serveur Node.js de continuer à fonctionner même après avoir quitté le terminal. Nous devons l'installer en global. (Il permet également de redémarrer automatiquement le serveur si il crash du à une erreur non capturée.)

```bash
sudo npm i -g pm2
```

La première fois, il peut afficher une erreur car aucun fichier "package.json" n'est trouvé. Il suffit de réexécuter la commande une seconde fois.

## Clone du projet

Clonez votre projet à la racine d'Ubuntu.

```bash
git clone mon_projet@github.com
```

```bash
cd mon_projet/
```

Normalement, vous devriez avoir un fichier `.env.example`, mais pas de fichier `.env`. Nous allons donc le copier.

```bash
cp .env.example .env
```

Ensuite, ouvrez le fichier `.env` :

```bash
nano .env
```

L'éditeur de texte "nano" s'ouvrira. Remplissez les informations dans le fichier `.env`. Utilisez la combinaison de touches "CTRL + X" pour quitter nano. Répondez "y" ou "yes" pour sauvegarder, puis appuyez sur "Entrée" et à nouveau sur "Entrée".

#### Sqitch

Si vous avez un fichier "sqitch.conf.example", exécutez les commandes suivantes :

```bash
cp sqitch.conf.example sqitch.conf
```

```bash
nano sqitch.conf
```

Effectuez les modifications nécessaires dans le fichier.

### Installation des packages

```bash
npm i
```

Pour l'instant, nous en avons terminé avec le projet.

### ÉTAPES IMPORTANTES !!!!!

Suivez attentivement ces étapes (prenez le temps de les exécuter).

```bash
sudo nano /etc/nginx/sites-available/default
```

Vous trouverez 3 blocs "server". Ajoutez le code suivant dans la partie DU DEUXIÈME BLOC "server" :

```bash
        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
```

Utilisez la combinaison de touches "CTRL + X", puis répondez "y" et appuyez sur "Entrée".

Vérifions que nous n'avons pas endommagé le fichier :

```bash
sudo nginx -t
```

Si la syntaxe est correcte et que le test est réussi, relançons Nginx :

```bash
sudo service nginx restart
```

Il ne nous reste plus qu'à exécuter la commande suivante pour démarrer notre fichier :

```bash
pm2 start /chemin/vers/monFichier.js
```

Vous devriez voir que votre serveur est en ligne. Normalement, tout est prêt.

Rendez-vous sur l'URL de votre VM cloud et voilà, votre serveur est déployé.

PS: dans un vrai déploiement il faudrait également faire des protections de pare-feu mais pour l'apothéose cela sera amplement suffisant.