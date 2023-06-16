# JWT

- [X] Créer une migration squitch pour ajouter une colonne à la BDD
- [X] Modifier la route de login
- [X] Supprimmer le logout et le session controller
- [X] Ajouter une route de refresh Token
- [X] Créer un dossier authentification
  - [ ] Ajouter un controller
  - [ ] Ajouter un service (un fichier par fonction ? approche microService )
  - [ ] Ajouter un datamapper
- [ ] Basculer le middleware d'authentification
- [ ] Refaire les middleware role et permission
  - [ ] Créer un middleware checkRBAC
    - [ ] Utiliser les fonctions en place pour décoder le header
    - [ ] Checker les rôles, permissions et userId pour restreindre à sa propre route
    - [ ] Incorporer sur les routes

    ```javascript
    router.get(
      '/:userId/stat',
      auth,
      checkRole('Admin'),
      checkPermission('View_stats'),
      controllerHandler(adminController.getAll.bind(adminController)),
    );
    ```
