# projet-05-o-world-back

- clone le projet
- npm init

- install sqitch

```
  sudo apt-get update
  sudo apt-get install sqitch

  sqitch --version

  sqitch config --user user.name 'John Doe'
  sqitch config --user user.email 'john@doe.org'
```

- créer une BDD

  ```
  sudo -i -u postgres psql

  CREATE DATABASE oworld OWNER oworld
  :\q
  ```

- script:

```
  npm run db:create
  npm run db:seed
```

- create .env and sqitch.conf
