-- Deploy oWorld:view_country_list to pg

BEGIN;

CREATE VIEW country_list AS 
SELECT name 
FROM country;

COMMIT;
