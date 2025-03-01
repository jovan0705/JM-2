## HOW TO RUN SERVER ON LOCAL
Change the config.json on /config to
```{
  "development": {
    "username": "postgres", // your username
    "password": "postgres", // your password
    "database": "data_kepegawaian",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres", // your username
    "password": "postgres", // your password
    "database": "data_kepegawaian_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres", // your username
    "password": "postgres", // your password
    "database": "data_kepegawaian_prod",
    "host": "localhost",
    "dialect": "postgres"
  }
}
```

Run this command to install the dependencies and run the server
```
1. npm i
2. npm i -D nodemon sequelize-cli
3. npx sequelize-cli db:create
4. npx sequelize-cli db:migrate
5. npx sequelize-cli db:seed:all
6. npm start
```


## HOW TO RUN SERVER ON DOCKER
Change the config.json on /config to
```{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "data_kepegawaian",
    "host": "postgres",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "data_kepegawaian_test",
    "host": "postgres",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres", // your username
    "password": "postgres", // your password
    "database": "data_kepegawaian_prod",
    "host": "postgres",
    "dialect": "postgres"
  }
}
```

Run this command to run the server
```
1. npm run build
2. npm run db-docker-migrate
3. npm run db-docker-seed
```


