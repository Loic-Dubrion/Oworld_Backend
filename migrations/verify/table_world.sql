-- Verify oWorld:table_world on pg

BEGIN;

SELECT * FROM
    planets
WHERE false;

ROLLBACK;
