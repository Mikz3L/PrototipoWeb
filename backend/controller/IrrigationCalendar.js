import db from "../database/DBconexion.js";
import EmailService from "./Notificaciones.js";

class IrrigationCalendar {
  constructor() {}

  // Crear Riego
  CrearRiego(req, res) {
    const servicioNotificaciones = new EmailService();
    const { id_user, irrigation_day, irrigation_start_hour, irrigation_end_hour } = req.body;

    const query = `
      INSERT INTO irrigation_calendar (id_user, irrigation_day, irrigation_start_hour, irrigation_end_hour)
      VALUES (?, ?, ?, ?)`;

    db.query(query, [id_user, irrigation_day, irrigation_start_hour, irrigation_end_hour], (err, result) => {
      if (err) {
        console.error("Error al registrar riego:", err);
        return res.status(500).render("programar", {
          id_user,
          message: "Hubo un error al registrar el riego. Inténtalo nuevamente.",
        });
      }

      res.render("programar", {
        id_user,
        message: "El riego ha sido registrado exitosamente.",
      });

      // Enviar notificación por correo
      servicioNotificaciones.sendEmail(
        "Riego Registrado",
        `El riego para el usuario ${id_user} ha sido registrado exitosamente para el día ${irrigation_day} de ${irrigation_start_hour} hasta ${irrigation_end_hour}.`
      );
    });
  }

  // Listar Riegos
  ListarRiegos(req, res) {
    const query = `
      SELECT irrigation_calendar.*, user.name AS user_name 
      FROM irrigation_calendar 
      INNER JOIN user ON irrigation_calendar.id_user = user.id_user`;

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error al listar riegos:", err);
        return res.status(500).send("Hubo un error al obtener la lista de riegos.");
      }

      if (results.length === 0) {
        return res.status(404).send("No hay riegos registrados.");
      }

      res.status(200).render("listarRiegos", { riegos: results });
    });
  }

  // Actualizar Riego
  ActualizarRiego(req, res) {
    const { id } = req.params;
    const { irrigation_day, irrigation_start_hour, irrigation_end_hour } = req.body;

    const query = `
      UPDATE irrigation_calendar 
      SET irrigation_day = ?, irrigation_start_hour = ?, irrigation_end_hour = ? 
      WHERE id_calendar = ?`;

    db.query(query, [irrigation_day, irrigation_start_hour, irrigation_end_hour, id], (err, result) => {
      if (err) {
        console.error("Error al actualizar riego:", err);
        return res.status(500).send("Hubo un error al actualizar el riego.");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("No se encontró el riego para actualizar.");
      }

      res.send("El riego ha sido actualizado exitosamente.");
    });
  }

  // Eliminar Riego
  EliminarRiego(req, res) {
    const { id } = req.params;

    const query = "DELETE FROM irrigation_calendar WHERE id_calendar = ?";

    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error al eliminar riego:", err);
        return res.status(500).send("Hubo un error al eliminar el riego.");
      }

      if (result.affectedRows === 0) {
        return res.status(404).send("No se encontró el riego para eliminar.");
      }

      res.send("El riego ha sido eliminado exitosamente.");
    });
  }

  // Obtener datos para el calendario
ObtenerRiegosParaCalendario(req, res) {
  const query = `
      SELECT id_calendar AS id, 
             irrigation_day AS start, 
             CONCAT(irrigation_day, ' ', irrigation_start_hour) AS start,
             CONCAT(irrigation_day, ' ', irrigation_end_hour) AS end
      FROM irrigation_calendar
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error("Error al obtener los riegos:", err);
          return res.status(500).json({ error: "Error al obtener los riegos" });
      }

      res.json(results);
  });
}
}

export default IrrigationCalendar;
