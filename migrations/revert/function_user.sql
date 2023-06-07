-- Revert oWorld:function_user from pg

BEGIN;

DROP FUNCTION insert_user;

COMMIT;
