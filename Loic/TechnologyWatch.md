# Technology watch

## Choice of Api

- Rest Countries
  - Doc : <https://restcountries.com/#endpoints-name>

- World Bank
  - Doc : <https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information>
  - Liste des indicateurs : <https://data.worldbank.org/indicator>

- Api Ninja
  - Doc : <https://api-ninjas.com/api>

### External api risk

- Risk of service failure
- Long search times

### Solution envisaged

memoization caching
caching with Redis
follow-up monitoring ?

- Memoize : test, simple and quick to set up but storage in RAM. Impossible to cache all external requests. (estimated at over 30GB)

- Redis :
  Getting to grips with redis with the IONOS tutorial
  Creating a test and a redis client with the Documentation
  <https://redis.io/docs/clients/nodejs/>

## Choice of techniques and technologies

### role management and authorisation

We decided to implement role management in our project using the RBAC (Role-Based Access Control) model rather than the ACL (Access Control List). This decision was motivated by the simplicity and size of the project. The RBAC model offers a structured approach using roles to group authorisations, which facilitates management and maintenance, even when the number of routes and roles increases. In the case of a small application with a limited number of routes and roles, using an ACL model would introduce excessive complexity and unnecessary over-sizing. By opting for the RBAC model, we can implement a simpler solution tailored to our needs.

### JWT authentication

The JWT offers additional security compared with sessions.
We first check the passwords and usernames, then the ip.
The token has a lifespan of 20 minutes and then requires a refresh token.

Doc: <https://jwt.io/> and <https://www.npmjs.com/package/jsonwebtoken>

### back-up of the database

pg_dump is a PostgreSQL database backup utility. It is used to save a PostgreSQL database to a file in SQL format or in other formats such as PostgreSQL's custom format.

doc :  <https://www.postgresql.org/docs/current/app-pgdump.html>
