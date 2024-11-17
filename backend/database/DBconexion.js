import mysql from "mysql";
import "dotenv/config";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexion a la base de datos:", err);
    return;
  }
  console.log("conexion exitosa a la base de datos");
});

export default db;
