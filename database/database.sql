const mysql = require('mysql2');

// Crear una conexión con la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',      // Cambia esto si usas otro host
  user: 'root',           // Tu usuario de MySQL
  password: '',           // Tu contraseña de MySQL
  database: 'orquiGestion', // Nombre de la base de datos
  // port: 3307             // Especificamos el puerto (por ejemplo, 3307), pero está comentado
});

// Verificar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos como id ' + connection.threadId);
});

module.exports = connection;

// instalar el npm install mysql2 express
