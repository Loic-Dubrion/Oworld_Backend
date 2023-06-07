-- Revert oWorld:table_world from pg

BEGIN;

DROP TABLE IF EXISTS 
  planets;

COMMIT;
