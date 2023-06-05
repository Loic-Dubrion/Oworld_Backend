-- Revert oWorld:init from pg

BEGIN;

DROP TABLE IF EXISTS 
  "user_has_favorite",
  "user_has_role",
  "role_has_authorisation",
  "role",
  "authorisation",
  "user",
  "country";

DROP DOMAIN IF EXISTS 
  "email",
  "iso3",
  "iso2";

COMMIT;
