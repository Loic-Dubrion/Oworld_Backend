-- Revert oWorld:function_favourite from pg

BEGIN;

DROP FUNCTION insert_favorite;
DROP FUNCTION delete_favorite;

COMMIT;
