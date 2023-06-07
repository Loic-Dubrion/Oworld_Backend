-- Revert oWorld:view_country_list from pg

BEGIN;

DROP VIEW country_list;

COMMIT;
