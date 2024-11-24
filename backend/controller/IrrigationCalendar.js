import db from "../database/DBconexion.js";

class IrrigationCalendar {
  CrearRiego(req, res) {
    const { id_user, irrigation_day, irrigation_hour } = req.body;
    const query =
      "INSERT INTO irrigation_calendar (id_user, irrigation_day, irrigation_hour) VALUES (?, ?, ?)";
    db.query(
      query,
      [id_user, irrigation_day, irrigation_hour],
      (err, result) => {
        if (err) {
          console.error("Error al registrar riego:", err);
          res.status(500).render("programar", { 
            id_user, 
            message: "Error al registrar riego" 
          });
          return;
        }
        res.render("programar", { 
          id_user, 
          message: "Riego registrado exitosamente" 
        });
      }
    );
  }


  ListarRiegos(req, res) {
    const query = "SELECT * FROM irrigation_calendar";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error al listar riegos:", err);
        res.status(500).send("Error al listar riegos");
        return;
      }
    });
  }
  
  
  

  ActualizarRiego(req, res) {
    const { id } = req.params;
    const { irrigation_day, irrigation_hour } = req.body;
    const query =
      "UPDATE irrigation_calendar SET irrigation_day = ?, irrigation_hour = ? WHERE id_calendar = ?";
    db.query(query, [irrigation_day, irrigation_hour, id], (err, result) => {
      if (err) {
        console.error("Error al actualizar riego:", err);
        res.status(500).send("Error al actualizar riego");
        return;
      }
      res.send("Riego actualizado exitosamente");
    });
  }

  EliminarRiego(req, res) {
    const { id } = req.params;
    const query = "DELETE FROM irrigation_calendar WHERE id_calendar = ?";
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al eliminar riego:", err);
        res.status(500).send("Error al eliminar riego");
        return;
      }
      res.send("Riego eliminado exitosamente");
    });
  }
}

export default IrrigationCalendar;
