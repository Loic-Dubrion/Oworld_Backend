-- Revert oWorld:rbac from pg

BEGIN;

DROP FUNCTION get_roles_and_permissions;

COMMIT;
