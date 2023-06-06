const express = require('express');

const router = express.Router();

router.get(
  '/:userID',
);
// - Objet avec détail d'un pays ( catégories api rest world bank)
// - Les pays favoris
// - % de pays favoris vs total

router.get(
  '/:userID/:countryId',
);
// - Objet avec détail d'un pays ( catégories api rest world bank)
// - Les pays favoris
// - % de pays favoris vs total

router.post(
  '/:userID/:countryID/',
);
// - ajout d'un favoris

router.put(
  '/:userID',
);
// - Modifier le profil
// - Modifier les pays pin

router.delete(
  '/:userID',
);

router.delete(
  '/:userID/:countryID/',
);
// - supp d'un favoris
