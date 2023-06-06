-- Deploy oWorld:view_stat to pg

BEGIN;

CREATE VIEW stat_admin AS
  SELECT 
    c.name AS country_origin,
    AVG(EXTRACT(YEAR FROM AGE(u.birth_date))) AS average_age,
    COUNT(DISTINCT u.id) AS user_count,
    COUNT(DISTINCT uf.user_id) AS favorite_count
  FROM 
    country c
  LEFT JOIN 
    "user" u ON c.id = u.country_origin
  LEFT JOIN 
    user_has_favorite uf ON c.id = uf.country_id
  GROUP BY 
    c.name
  HAVING 
    AVG(EXTRACT(YEAR FROM AGE(u.birth_date))) IS NOT NULL 
    AND (COUNT(DISTINCT u.id) > 0 OR COUNT(DISTINCT uf.user_id) > 0)
  ORDER BY 
    user_count ASC;

COMMIT;
