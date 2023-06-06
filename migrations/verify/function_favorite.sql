-- Verify oWorld:function_favorite on pg

BEGIN;

SELECT * FROM favorite_countries(2) WHERE FALSE;

ROLLBACK;
