-- Deploy oWorld:refresh_token to pg

BEGIN;

ALTER TABLE "user" 
ADD COLUMN refresh_token TEXT;

COMMIT;
