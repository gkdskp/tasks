import { DataSource } from "typeorm";
export const datasource = new DataSource({

  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "postgres",
  "database": "myapp",
  "logging": true,
  "entities": [
    "dist/**/*.entity.js"
  ],
  "migrationsTableName": "migration",
  "migrations": [
    "src/migration/*.ts"
  ],
})


//;