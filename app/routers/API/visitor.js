const express = require('express');

const router = express.Router();

// retourne objet avec l'ensemble de la table pays
router.get(
  '/'
);

// détail d'un pays
router.get(
  '/:country'
);
