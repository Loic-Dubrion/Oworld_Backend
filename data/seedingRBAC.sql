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
