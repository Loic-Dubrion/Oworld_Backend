-- Deploy oWorld:function_user to pg

BEGIN;

CREATE OR REPLACE FUNCTION insert_user(userObj JSON) 
RETURNS JSON AS $$
DECLARE
    usernameParam TEXT;
    emailParam TEXT;
    passwordParam TEXT;
    countryOriginParam INTEGER;
    birthDateParam DATE;
    response JSON;
BEGIN
    SELECT 
        userObj ->> 'username',
        userObj ->> 'email',
        userObj ->> 'password',
        (userObj ->> 'country_origin')::INTEGER,
        (userObj ->> 'birth_date')::DATE
    INTO 
        usernameParam,
        emailParam,
        passwordParam,
        countryOriginParam,
        birthDateParam;
    
    INSERT INTO "user" (username, email, password, country_origin, birth_date)
    VALUES (usernameParam, emailParam, passwordParam, countryOriginParam, birthDateParam);

    response := json_build_object('http status', 201, 'message', 'Success! ' || usernameParam || ' has been inserted');
    
    RETURN response;
END;
$$ LANGUAGE plpgsql;


COMMIT;
