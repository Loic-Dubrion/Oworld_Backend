-- Deploy oWorld:function_favorite to pg

BEGIN;

CREATE OR REPLACE FUNCTION favorite_countries(p_user_id integer)
RETURNS TABLE (
    username TEXT,
    origin_country TEXT,
    favorite_countries TEXT[][],
    favorite_country_percentage numeric
) AS $$
BEGIN
RETURN QUERY
SELECT 
    u.username, 
    c.name as origin_country, 
    ARRAY_AGG(ARRAY[f.name, f.iso3, uf.created_at::text]),
    (COUNT(DISTINCT f.id) * 100.0 / cnt.total) as favorite_country_percentage
FROM "user" u
JOIN country c ON u.country_origin = c.id
LEFT JOIN user_has_favorite uf ON u.id = uf.user_id
LEFT JOIN country f ON uf.country_id = f.id,
(SELECT COUNT(*) as total FROM country) cnt
WHERE u.id = p_user_id
GROUP BY u.username, c.name, cnt.total;
END;
$$
LANGUAGE plpgsql STABLE;


COMMIT;
