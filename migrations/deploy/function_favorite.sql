-- Deploy oWorld:function_favorite to pg

BEGIN;

CREATE FUNCTION favorite_countries(user_id integer)
RETURNS TABLE (
    username TEXT,
    origin_country TEXT,
    favorite_countries TEXT[],
    favorite_country_percentage numeric
) AS $$
    SELECT 
        u.username, 
        c.name as origin_country, 
        ARRAY_AGG(f.name),
        (COUNT(DISTINCT f.id) * 100.0 / (SELECT COUNT(*) FROM country))
    FROM "user" u
    JOIN country c ON u.country_origin = c.id
    LEFT JOIN user_has_favorite uf ON u.id = uf.user_id
    LEFT JOIN country f ON uf.country_id = f.id
    WHERE u.id = user_id
    GROUP BY u.username, c.name;
$$
LANGUAGE sql STABLE;

COMMIT;
