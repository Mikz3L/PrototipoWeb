import db from "../database/DBconexion.js";

class usuario {
  CrearUsuario(req, res) {
    const { name, email, pass } = req.body;
    const query = "INSERT INTO user (name, email, pass) VALUES (?, ?, ?)";
    db.query(query, [name, email, pass], (err, result) => {
      if (err) {
        console.error("Error al crear el usuario:", err);
        res.status(500).send("Error al crear el usuario");
        return;
      }
      res.redirect("/");
    });
  }

  LogearUsuario(req, res) {
    const { email, pass } = req.body;
    const query = "SELECT * FROM user WHERE email = ? AND pass = ?";
    db.query(query, [email, pass], (err, results) => {
      if (err) {
        console.error("Error al iniciar sesión:", err);
        res.status(500).send("Error al iniciar sesión");
        return;
      }
      if (results.length > 0) {
        res.redirect("/menuprincipal");
      } else {
        res.render("login", {
          error: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
        });
      }
    });
  }
}
export default usuario;
