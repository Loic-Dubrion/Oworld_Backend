# JWT

- [X] Créer une migration squitch pour ajouter une colonne à la BDD
- [ ] Modifier la route de login
- [ ] Supprimmer le logout et le session controller
- [ ] Ajouter une route de refresh Token
- [ ] Créer un dossier authentification
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
