-- Insertion des rôles
INSERT INTO "role" ("name") VALUES ('Admin'), ('User');

-- Insertion des autorisations
INSERT INTO "authorisation" ("name") VALUES ('View_stats'), ('Create'), ('Read'), ('Update'), ('Delete');

-- Association des rôles aux utilisateurs
INSERT INTO "user_has_role" ("user_id", "role_id") VALUES (1, 1), (2, 2);

-- Association des autorisations aux rôles
INSERT INTO "role_has_authorisation" ("role_id", "authorisation_id") 
VALUES 
(1, 1), 
(2, 3), 
(2, 4), 
(2, 5);

INSERT INTO "role" ("name") 
VALUES 
('Admin'), 
('User');

INSERT INTO "authorisation" ("name") 
VALUES 
('View_stats'), 
('Create'), 
('Read'), 
('Update'), 
('Delete');

INSERT INTO "role_has_authorisation" ("role_id", "authorisation_id") 
VALUES 
(1, 1), 
(2, 3), 
(2, 4), 
(2, 5);
