import { createPool } from "mysql2/promise";

export const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Diosesamor182001*",
  port: 3306,
  database: "innovastorenicdb",
});
