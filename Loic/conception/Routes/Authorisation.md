# Authorisation

## Admin

    Read: Autorisation pour accéder aux statistiques d'utilisateur (GET /api/admin/stats).

## Visitors

    Read: Autorisation pour accéder aux détails des pays (GET /api/oworld/ et GET /api/oworld/:countryID).

## Users

    Create: Autorisation pour s'inscrire (POST /api/oworld/subscribe).
    Read: Autorisation pour accéder à son propre profil et aux détails des pays (GET /api/oworld/:UserID et GET /api/oworld/:UserID/:countryID).
    Update: Autorisation pour modifier son profil et ses favoris de pays (PUT /api/oworld/:UserID/).
    Delete: Autorisation pour supprimer son propre profil (DELETE /api/oworld/:UserID).