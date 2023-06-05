-- Deploy oWorld:init to pg

BEGIN;

CREATE DOMAIN email AS TEXT
CHECK (
  VALUE ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

CREATE DOMAIN iso3 AS TEXT
CHECK (
  VALUE ~* '^[A-Z]{3}$'
);

CREATE DOMAIN iso2 AS TEXT
CHECK (
  VALUE ~* '^[A-Z]{2}$'
);

CREATE TABLE "country" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "iso2" iso2 UNIQUE NOT NULL,
    "iso3" iso3 UNIQUE NOT NULL,
    "iso_numeric" INTEGER UNIQUE NOT NULL,
    "name" TEXT UNIQUE NOT NULL,
    "insolite" TEXT DEFAULT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" TEXT UNIQUE NOT NULL,
    "email" email UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "country_origin" INTEGER REFERENCES "country"("id"),
    "birth_date" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "authorisation" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user"("id"),
    "role_id" INTEGER REFERENCES "role"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "role_has_authorisation" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "role_id" INTEGER REFERENCES "role"("id"),
    "authorisation_id" INTEGER REFERENCES "authorisation"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user_has_favorite" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INTEGER REFERENCES "user"("id"),
    "country_id" INTEGER REFERENCES "country"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);


COMMIT;
