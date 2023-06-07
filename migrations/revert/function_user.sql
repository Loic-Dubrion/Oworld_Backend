-- Revert oWorld:function_user from pg

BEGIN;

DROP FUNCTION insert_user;
DROP FUNCTION update_user;
DROP FUNCTION delete_user;

COMMIT;
