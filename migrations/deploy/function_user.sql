-- Deploy oWorld:function_user to pg

BEGIN;

-- function for creating a user
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


-- function for updating a user
CREATE OR REPLACE FUNCTION update_user(userId INTEGER, userObj JSON) 
RETURNS JSON AS $$
DECLARE
    usernameParam TEXT;
    emailParam TEXT;
    passwordParam TEXT;
    response JSON;
BEGIN
    -- Extraire les valeurs de l'objet JSON, s'ils existent
    SELECT 
        COALESCE((userObj ->> 'username'), username),
        COALESCE((userObj ->> 'email'), email),
        COALESCE((userObj ->> 'password'), password)
    INTO 
        usernameParam,
        emailParam,
        passwordParam
    FROM "user"
    WHERE id = userId;

    -- Mettre à jour l'utilisateur avec les nouvelles valeurs
    UPDATE "user" 
    SET 
        username = usernameParam, 
        email = emailParam, 
        password = passwordParam
    WHERE id = userId;

    response := json_build_object('http status', 200, 'message', 'Success! User ' || userId || ' has been updated');

    RETURN response;
END;
$$ LANGUAGE plpgsql;


-- function for deleting a user
CREATE OR REPLACE FUNCTION delete_user(userId INTEGER) 
RETURNS JSON AS $$
DECLARE
    response JSON;
BEGIN
    DELETE FROM "user" 
    WHERE id = userId;
    
    response := json_build_object('http status', 200, 'message', 'Success! User ' || userId || ' has been deleted');

    RETURN response;
END;
$$ LANGUAGE plpgsql;


COMMIT;
