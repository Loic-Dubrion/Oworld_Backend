-- Verify oWorld:view_country_list on pg

BEGIN;

SELECT * FROM country_list WHERE FALSE;

ROLLBACK;
