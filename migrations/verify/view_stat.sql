-- Verify oWorld:view_stat on pg

BEGIN;

SELECT * FROM stat_admin WHERE FALSE;

ROLLBACK;
