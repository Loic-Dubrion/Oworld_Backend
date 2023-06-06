const express = require('express');

const router = express.Router();

const controllerHandler = require('../../controllers/services/controllerHandler');
const { userController } = require('../../controllers/API');

router.get(
  '/:userId',
  controllerHandler(userController.getFavoriteCountries.bind(userController)),
);

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

module.exports = router;
