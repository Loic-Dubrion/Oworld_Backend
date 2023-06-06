-- Revert oWorld:view_stat from pg

BEGIN;

DROP VIEW stat_admin;

COMMIT;
