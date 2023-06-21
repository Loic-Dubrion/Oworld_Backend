# MLD DATABASE O'World

Pour mémoire :

- Si depuis une table on a un N en cardinalité => FK dans l'autre table
- Si depuis une table on n'a pas de N en cardinalité => Pas de FK
- Si on N des 2 côtés => Table de liason avec 2 FK

## TABLES

**user**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| username | TEXT | |
| email | TEXT | |
| password | TEXT | |
| country_origin | TEXT | Foreign Key |
| birth_date | TIMESTAMPTZ | |

**role**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |

**authorisation**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| name | TEXT | |

**user_has_role**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| user_id | INTEGER | Foreign Key - user.id |
| role_id | INTEGER | Foreign Key - role.id |

**role_has_authorisation**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| role_id | INTEGER | Foreign Key - role.id |
| authorisation_id | INTEGER | Foreign Key - authorisation.id |

**country**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| iso2 | VARCHAR(2) | UNIQUE |
| iso3 | VARCHAR(3) | UNIQUE |
| iso_numeric | INT | UNIQUE |
| insolite | TEXT |  |
| name | TEXT | |

**user_has_favorite**
| Column | Type | |
| :--- | :--- | :--- |
| id | INTEGER | Primary Key |
| user_id | INTEGER | Foreign Key - user.id |
| country_id | INTEGER | Foreign Key - country.id |
