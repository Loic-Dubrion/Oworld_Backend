-- Deploy oWorld:table_world to pg

BEGIN;

CREATE TABLE Planets (
  id SERIAL PRIMARY KEY,
  data jsonb
);

COMMIT;
