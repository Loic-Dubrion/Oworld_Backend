-- Revert oWorld:rbac from pg

BEGIN;

DROP FUNCTION get_user_roles_and_permissions;

COMMIT;
