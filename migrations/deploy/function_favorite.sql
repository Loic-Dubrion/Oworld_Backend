-- Deploy oWorld:function_favorite to pg

BEGIN;

CREATE OR REPLACE FUNCTION favorite_countries(p_user_id INTEGER)
RETURNS TEXT AS $$
DECLARE
    result TEXT;
BEGIN
    SELECT 
        json_build_object(
            'username', u.username,
            'country_origin', u.country_origin,
            'favorite', STRING_AGG(CONCAT('name: ', c.name, ', iso3: ', c.iso3, ', created_at: ', uf.created_at::TEXT), ', '),
            'pourcentage', COUNT(DISTINCT c.id) * 100.0 / GREATEST((SELECT COUNT(*) FROM country), 1)
        )::text 
    INTO result
    FROM
        "user" u
    LEFT JOIN
        user_has_favorite uf ON u.id = uf.user_id
    LEFT JOIN
        country c ON uf.country_id = c.id
    WHERE
        u.id = p_user_id
    GROUP BY
        u.username,
        u.country_origin;

    RETURN result;
END; $$
LANGUAGE plpgsql STABLE;


COMMIT;
