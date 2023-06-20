-- Deploy oWorld:rbac to pg

BEGIN;

CREATE OR REPLACE FUNCTION get_user_roles_and_permissions(user_id INT) RETURNS TABLE (roles TEXT[], permissions TEXT[])
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ARRAY_AGG(DISTINCT role.name) AS roles, 
    ARRAY_AGG(DISTINCT authorisation.name) AS permissions
  FROM 
    "user" AS u
  JOIN 
    user_has_role ON u.id = user_has_role.user_id
  JOIN 
    role ON user_has_role.role_id = role.id
  JOIN 
    role_has_authorisation ON role.id = role_has_authorisation.role_id
  JOIN 
    authorisation ON role_has_authorisation.authorisation_id = authorisation.id
  WHERE 
    u.id = get_user_roles_and_permissions.user_id;
END;
$$ LANGUAGE plpgsql;

COMMIT;
