-- Verify oWorld:init on pg

BEGIN;

SELECT * FROM
    "role_has_authorisation",
    "user_has_favorite",
    "user_has_role",
    "role",
    "authorisation",
    "country",
    "user"
WHERE false;

ROLLBACK;
