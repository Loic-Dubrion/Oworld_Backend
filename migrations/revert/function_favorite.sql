-- Revert oWorld:function_favorite from pg

BEGIN;

DROP FUNCTION favorite_countries;

COMMIT;
