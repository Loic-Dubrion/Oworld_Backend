-- Deploy oWorld:function_favourite to pg

BEGIN;

CREATE OR REPLACE FUNCTION insert_favorite(userId INTEGER, iso TEXT) 
RETURNS JSON AS $$
DECLARE
    countryId INTEGER;
    response JSON;
BEGIN
    SELECT id INTO countryId FROM country WHERE iso2 = iso OR iso3 = iso;

    INSERT INTO user_has_favorite (user_id, country_id) VALUES (userId, countryId);

    response := json_build_object(
        'httpCode', 201,
        'status', 'success',
        'message', 'country has been inserted'
    );    
    RETURN response;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION delete_favorite(userId INTEGER, iso TEXT) 
RETURNS JSON AS $$
DECLARE
    countryId INTEGER;
    response JSON;
BEGIN
    SELECT id INTO countryId FROM country WHERE iso2 = iso OR iso3 = iso;

    DELETE FROM user_has_favorite WHERE user_id = userId AND country_id = countryId;

    response := json_build_object(
        'httpCode', 201,
        'status', 'success',
        'message', 'country has been deleted'
    );     
    RETURN response;
END;
$$ LANGUAGE plpgsql;

COMMIT;
