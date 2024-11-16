import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '12345678',
  database: 'orquigestion'
});

db.connect(err => {
  if (err) {
    console.error('Error de conexion a la base de datos:', err);
    return;
  }
  console.log('conexion exitosa a la base de datos');
});

export default db;
